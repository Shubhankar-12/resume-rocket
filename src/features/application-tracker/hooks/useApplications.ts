"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import {
  Application,
  ApplicationStatus,
  APPLICATION_STATUSES,
  CreateApplicationData,
  KanbanColumns,
} from "../types/application";
import { ApplicationTrackerAPI } from "../api/applicationTrackerAPI";
import type { UpdateApplicationData } from "../api/applicationTrackerAPI";

function buildEmptyColumns(): KanbanColumns {
  return APPLICATION_STATUSES.reduce((acc, status) => {
    acc[status] = [];
    return acc;
  }, {} as KanbanColumns);
}

function groupByStatus(applications: Application[]): KanbanColumns {
  const columns = buildEmptyColumns();
  for (const app of applications) {
    if (columns[app.status]) {
      columns[app.status].push(app);
    }
  }
  // Sort each column by position ascending
  for (const status of APPLICATION_STATUSES) {
    columns[status].sort((a, b) => a.position - b.position);
  }
  return columns;
}

function getUserIdFromToken(): string | null {
  try {
    const token = getCookie("token") as string | undefined;
    if (!token) return null;
    const decoded = jwt.decode(token) as {
      user?: { id?: string };
      user_id?: string;
      id?: string;
    } | null;
    return decoded?.user?.id ?? decoded?.user_id ?? decoded?.id ?? null;
  } catch {
    return null;
  }
}

export interface UseApplicationsResult {
  columns: KanbanColumns;
  loading: boolean;
  error: string | null;
  search: string;
  setSearch: (value: string) => void;
  sort: string;
  setSort: (value: string) => void;
  createApplication: (data: CreateApplicationData) => Promise<void>;
  updateApplication: (applicationId: string, data: Partial<Application>) => Promise<void>;
  reorderApplication: (
    applicationId: string,
    newStatus: ApplicationStatus,
    newPosition: number
  ) => Promise<void>;
  deleteApplication: (applicationId: string) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useApplications(): UseApplicationsResult {
  const [columns, setColumns] = useState<KanbanColumns>(buildEmptyColumns);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("created_on_desc");

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestSearchRef = useRef<string>(search);
  const latestSortRef = useRef<string>(sort);

  const fetchApplications = useCallback(async (searchVal: string, sortVal: string) => {
    const userId = getUserIdFromToken();
    if (!userId) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const response = await ApplicationTrackerAPI.list({
        user_id: userId,
        search: searchVal || undefined,
        sort: sortVal || undefined,
      });
      const apps: Application[] = response?.data?.body?.applications ?? [];
      setColumns(groupByStatus(apps));
    } catch {
      setError("Failed to load applications");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchApplications(search, sort);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Debounced re-fetch when search changes
  useEffect(() => {
    latestSearchRef.current = search;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchApplications(latestSearchRef.current, latestSortRef.current);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search, fetchApplications]);

  // Immediate re-fetch when sort changes
  useEffect(() => {
    latestSortRef.current = sort;
    fetchApplications(latestSearchRef.current, sort);
  }, [sort, fetchApplications]);

  const refetch = useCallback(async () => {
    await fetchApplications(latestSearchRef.current, latestSortRef.current);
  }, [fetchApplications]);

  const createApplication = useCallback(
    async (data: CreateApplicationData) => {
      const userId = getUserIdFromToken();
      if (!userId) throw new Error("User not authenticated");
      await ApplicationTrackerAPI.create({ ...data, user_id: userId });
      await refetch();
    },
    [refetch]
  );

  const updateApplication = useCallback(
    async (applicationId: string, data: Partial<Application>) => {
      const userId = getUserIdFromToken();
      if (!userId) throw new Error("User not authenticated");
      const payload: UpdateApplicationData = {
        application_id: applicationId,
        user_id: userId,
        ...data,
      };
      await ApplicationTrackerAPI.update(payload);
      await refetch();
    },
    [refetch]
  );

  const reorderApplication = useCallback(
    async (applicationId: string, newStatus: ApplicationStatus, newPosition: number) => {
      // Optimistic update: move the card in local state immediately
      setColumns((prev) => {
        const next = buildEmptyColumns();
        // Copy all columns
        for (const status of APPLICATION_STATUSES) {
          next[status] = [...prev[status]];
        }

        // Find which column currently holds the card
        let movedApp: Application | undefined;
        for (const status of APPLICATION_STATUSES) {
          const idx = next[status].findIndex((a) => a.application_id === applicationId);
          if (idx !== -1) {
            [movedApp] = next[status].splice(idx, 1);
            break;
          }
        }

        if (!movedApp) return prev;

        // Update the card's status
        movedApp = { ...movedApp, status: newStatus, position: newPosition };

        // Insert at the new position
        const targetCol = [...next[newStatus]];
        targetCol.splice(newPosition, 0, movedApp);
        // Re-assign positions
        next[newStatus] = targetCol.map((app, i) => ({ ...app, position: i }));

        return next;
      });

      // Persist to backend; revert on failure
      try {
        await ApplicationTrackerAPI.reorder({
          application_id: applicationId,
          new_status: newStatus,
          new_position: newPosition,
        });
      } catch {
        // Revert to server state
        await refetch();
        throw new Error("Failed to reorder application");
      }
    },
    [refetch]
  );

  const deleteApplication = useCallback(
    async (applicationId: string) => {
      const userId = getUserIdFromToken();
      if (!userId) throw new Error("User not authenticated");
      await ApplicationTrackerAPI.disable({
        application_id: applicationId,
        user_id: userId,
      });
      await refetch();
    },
    [refetch]
  );

  return {
    columns,
    loading,
    error,
    search,
    setSearch,
    sort,
    setSort,
    createApplication,
    updateApplication,
    reorderApplication,
    deleteApplication,
    refetch,
  };
}
