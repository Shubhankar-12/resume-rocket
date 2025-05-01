import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, FileText, Tag, ExternalLink } from "lucide-react";

export function TipsCard() {
  return (
    <Card>
      <CardHeader className="bg-primary/5 pb-3">
        <CardTitle className="text-lg">
          Tips for Strong GitHub Projects
        </CardTitle>
        <CardDescription>
          Optimize your repositories for maximum impact
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <ul className="space-y-4">
          <li className="flex gap-3">
            <div className="mt-0.5 text-primary">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">Clear Description</h3>
              <p className="text-sm text-muted-foreground">
                Include a concise description that explains what your project
                does and the problem it solves.
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <div className="mt-0.5 text-primary">
              <ExternalLink className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">Add Live Demo Links</h3>
              <p className="text-sm text-muted-foreground">
                Include links to live demos, deployed applications, or video
                walkthroughs in your README.
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <div className="mt-0.5 text-primary">
              <Tag className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">Use GitHub Topics</h3>
              <p className="text-sm text-muted-foreground">
                Add relevant topics that reflect your tech stack, tools, and
                project category for better discoverability.
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <div className="mt-0.5 text-primary">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">Detailed README</h3>
              <p className="text-sm text-muted-foreground">
                List key features, installation instructions, screenshots, and
                usage examples in your README.
              </p>
            </div>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
