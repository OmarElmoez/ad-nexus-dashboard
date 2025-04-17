
import { useState, useEffect } from "react";
import { useCampaignStore } from "@/store/useCampaignStore";
import { useAuthStore } from "@/store/useAuthStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const CampaignsPage = () => {
  const { user } = useAuthStore();
  const { campaigns, fetchCampaigns, toggleCampaignStatus, deleteCampaign } = useCampaignStore();
  
  useEffect(() => {
    // If admin, fetch all campaigns, otherwise fetch user's campaigns
    if (user?.role === "admin") {
      fetchCampaigns();
    } else if (user?.id) {
      fetchCampaigns(user.id);
    }
  }, [fetchCampaigns, user]);

  const getPlatformBadge = (platform: string) => {
    switch (platform) {
      case "google":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
            Google
          </Badge>
        );
      case "meta":
        return (
          <Badge variant="outline" className="bg-indigo-50 text-indigo-600 border-indigo-200">
            Meta
          </Badge>
        );
      case "linkedin":
        return (
          <Badge variant="outline" className="bg-sky-50 text-sky-600 border-sky-200">
            LinkedIn
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">{platform}</Badge>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Active
          </Badge>
        );
      case "paused":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
            Paused
          </Badge>
        );
      case "draft":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-200">
            Draft
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">{status}</Badge>
        );
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
          <p className="text-muted-foreground">
            Manage your advertising campaigns across multiple platforms.
          </p>
        </div>
        <Link to="/dashboard/create-campaign">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Campaigns</CardTitle>
          <CardDescription>
            View and manage your active, paused, and draft campaigns.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Platforms</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.length > 0 ? (
                campaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium">{campaign.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {campaign.platforms.map((platform) => (
                          <div key={platform}>{getPlatformBadge(platform)}</div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch 
                          checked={campaign.status === "active"} 
                          onCheckedChange={() => toggleCampaignStatus(campaign.id)}
                        />
                        <span>{getStatusBadge(campaign.status)}</span>
                      </div>
                    </TableCell>
                    <TableCell>${campaign.budget.toLocaleString()}</TableCell>
                    <TableCell>{formatDate(campaign.startDate)}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm">
                          {campaign.stats.impressions.toLocaleString()} impressions
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {campaign.stats.clicks.toLocaleString()} clicks ({campaign.stats.ctr}% CTR)
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => toggleCampaignStatus(campaign.id)}
                          >
                            {campaign.status === "active" ? "Pause" : "Activate"}
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/dashboard/edit-campaign/${campaign.id}`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => deleteCampaign(campaign.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex flex-col items-center">
                      <p className="text-lg font-semibold">No campaigns yet</p>
                      <p className="text-muted-foreground mb-4">
                        Create your first advertising campaign to get started.
                      </p>
                      <Link to="/dashboard/create-campaign">
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          New Campaign
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignsPage;
