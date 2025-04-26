export function convertToSearchParams(params: any) {
  if (!params) {
    return "";
  }

  const searchParams = new URLSearchParams();

  const formatArrayParam = (key: string, value: any) => {
    if (Array.isArray(value)) {
      // Format array values as [value1,value2]
      searchParams.append(key, `[${value.join(",")}]`);
    } else {
      searchParams.append(key, value);
    }
  };

  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (value === undefined) {
      searchParams.append(key, "");
    } else if (typeof value === "object" && value !== null) {
      Object.keys(value).forEach((subKey) => {
        const nestedValue = value[subKey];
        if (nestedValue === undefined) {
          searchParams.append(`${key}[${subKey}]`, "");
        } else {
          searchParams.append(`${key}[${subKey}]`, nestedValue);
        }
      });
    } else {
      formatArrayParam(key, value);
    }
  });

  return searchParams.toString();
}
export function generateBucketUrl(path: string): string {
  return `${process.env.NEXT_PUBLIC_BUCKET_PROXY_URL}${path}`;
  if (path == undefined) {
    return "";
  }
  if (path[0] == "/") {
    path = path.slice(1);
  }

  const obj = {
    bucket: process.env.AWS_BUCKET_NAME,
    key: "" + path,
    edits: {
      resize: {
        fit: "inside",
      },
    },
  };

  return `${process.env.NEXT_PUBLIC_BUCKET_PROXY_URL}/${btoa(
    JSON.stringify(obj)
  )}`;
}
import {
  format,
  formatDistanceToNow,
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
} from "date-fns";

export function formatRelativeDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();

  const secondsDiff = differenceInSeconds(now, date);
  const minutesDiff = differenceInMinutes(now, date);
  const hoursDiff = differenceInHours(now, date);
  const daysDiff = differenceInDays(now, date);

  if (secondsDiff <= 5) {
    return "now";
  } else if (secondsDiff < 60) {
    return "<1 min";
  } else if (minutesDiff < 60) {
    return `${minutesDiff} min ago`;
  } else if (hoursDiff < 24) {
    return `${hoursDiff} hour${hoursDiff > 1 ? "s" : ""} ago`;
  } else if (daysDiff <= 2) {
    return `${daysDiff} day${daysDiff > 1 ? "s" : ""} ago`;
  } else {
    return "" + format(new Date(dateString), "PPP p");
  }
}

export const translate = (data: any, language: string) => {
  return data[language] || data["en"];
};

// Example usage
const isoDateString = "2024-05-26T18:45:50.439Z";
console.log(formatRelativeDate(isoDateString));

export function convertToNormalText(input: any) {
  if (!input) {
    return "";
  }
  // Remove le}ading and trailing spaces
  let trimmedInput = input.trim();

  // Replace underscores and hyphens with spaces
  let cleanedInput = trimmedInput.replace(/[_-]/g, " ");

  // Convert to lower case, then capitalize the first letter of each word
  let normalText = cleanedInput
    .toLowerCase()
    .replace(/\b\w/g, (char: any) => char.toUpperCase());

  return normalText;
}
export const showAxiosError = (error: any) => {
  if (error && error.name == "AxiosError") {
    if (
      error.response &&
      error.response.data &&
      error.response.data.errors.length
    ) {
      console.log(
        "error.response.data.errors :>> ",
        error.response.data.errors
      );
      return {
        showError: true,
        errors: error.response.data.errors,
      };
    }
  } else {
    return {
      showError: true,
      errors: [
        {
          message: "Internal Error, please contact support",
          code: "INTERNAL_ERROR",
          field: "error",
        },
      ],
    };
  }
  return {
    showError: false,
    errors: [],
  };
};

export const convertToAED = (input: string) => {
  if (!input) return "-";

  try {
    return Number(input).toLocaleString("en-US", {
      style: "currency",
      currency: "AED",
    });
  } catch (err) {
    return "-";
  }
};
