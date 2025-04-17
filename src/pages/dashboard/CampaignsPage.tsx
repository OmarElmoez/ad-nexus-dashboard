
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Calendar as CalendarIcon, 
  Check, 
  Edit, 
  Facebook, 
  Linkedin, 
  MoreHorizontal, 
  Pause, 
  Play, 
  Plus, 
  Search as SearchIcon, 
  Trash2
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Campaign, PlatformType } from "@/store/useCampaignStore";

const CampaignsPage = () => {
  const { user } = useAuthStore();
  const { campaigns, fetchCampaigns, toggleCampaignStatus, deleteCampaign, createCampaign, updateCampaign } = useCampaignStore();
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [currentCampaign, setCurrentCampaign] = useState<Campaign | null>(null);
  
  // Form states for create dialog
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [platforms, setPlatforms] = useState<PlatformType[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  
  // Form states for edit dialog
  const [editStatus, setEditStatus] = useState<"active" | "paused" | "draft">("active");
  const [editPlatforms, setEditPlatforms] = useState<PlatformType[]>([]);
  
  useEffect(() => {
    // If admin, fetch all campaigns, otherwise fetch user's campaigns
    if (user?.role === "admin") {
      fetchCampaigns();
    } else if (user?.id) {
      fetchCampaigns(user.id);
    }
  }, [fetchCampaigns, user]);

  const handleCreateCampaign = () => {
    if (!name || !budget || platforms.length === 0 || !startDate || !user?.id) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    createCampaign({
      name,
      budget: parseFloat(budget),
      platforms,
      startDate,
      endDate,
      status: "draft",
      userId: user.id
    });
    
    toast.success("Campaign created successfully!");
    setIsCreateDialogOpen(false);
    resetCreateForm();
  };
  
  const resetCreateForm = () => {
    setName("");
    setBudget("");
    setPlatforms([]);
    setStartDate(new Date());
    setEndDate(undefined);
  };
  
  const handleEditCampaign = () => {
    if (!currentCampaign) return;
    
    updateCampaign(currentCampaign.id, {
      platforms: editPlatforms,
      status: editStatus
    });
    
    toast.success("Campaign updated successfully!");
    setIsEditDialogOpen(false);
  };
  
  const openEditDialog = (campaign: Campaign) => {
    setCurrentCampaign(campaign);
    setEditStatus(campaign.status);
    setEditPlatforms([...campaign.platforms]);
    setIsEditDialogOpen(true);
  };
  
  const openDeleteAlert = (campaign: Campaign) => {
    setCurrentCampaign(campaign);
    setIsDeleteAlertOpen(true);
  };
  
  const handleDeleteCampaign = () => {
    if (!currentCampaign) return;
    
    deleteCampaign(currentCampaign.id);
    toast.success("Campaign deleted successfully!");
    setIsDeleteAlertOpen(false);
  };

  const getPlatformBadge = (platform: string) => {
    switch (platform) {
      case "google":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 flex items-center gap-1">
            <SearchIcon className="h-3 w-3" />
            Google
          </Badge>
        );
      case "meta":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 flex items-center gap-1">
            <Facebook className="h-3 w-3" />
            Meta
          </Badge>
        );
      case "linkedin":
        return (
          <Badge variant="outline" className="bg-cyan-50 text-cyan-600 border-cyan-200 flex items-center gap-1">
            <Linkedin className="h-3 w-3" />
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
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1">
            <Play className="h-3 w-3" />
            Active
          </Badge>
        );
      case "paused":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200 flex items-center gap-1">
            <Pause className="h-3 w-3" />
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
    return format(new Date(date), "PPP");
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
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Campaign
        </Button>
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
                          <DropdownMenuItem onClick={() => openEditDialog(campaign)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Campaign
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => openDeleteAlert(campaign)}
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
                      <Button onClick={() => setIsCreateDialogOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        New Campaign
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Campaign Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[550px] animate-in fade-in-0 zoom-in-95 duration-300">
          <DialogHeader>
            <DialogTitle>Create New Campaign</DialogTitle>
            <DialogDescription>
              Create a new advertising campaign across multiple platforms.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Campaign Name</Label>
              <Input
                id="name"
                placeholder="Enter campaign name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="budget">Budget ($)</Label>
              <Input
                id="budget"
                type="number"
                placeholder="Enter budget amount"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Platforms</Label>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    checked={platforms.includes("google")} 
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setPlatforms([...platforms, "google"]);
                      } else {
                        setPlatforms(platforms.filter(p => p !== "google"));
                      }
                    }} 
                  />
                  <Label>Google</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    checked={platforms.includes("meta")} 
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setPlatforms([...platforms, "meta"]);
                      } else {
                        setPlatforms(platforms.filter(p => p !== "meta"));
                      }
                    }}
                  />
                  <Label>Meta</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    checked={platforms.includes("linkedin")} 
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setPlatforms([...platforms, "linkedin"]);
                      } else {
                        setPlatforms(platforms.filter(p => p !== "linkedin"));
                      }
                    }}
                  />
                  <Label>LinkedIn</Label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-2">
                <Label>End Date (Optional)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      disabled={(date) => (startDate ? date < startDate : false)}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateCampaign}>Create Campaign</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Campaign Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[450px] animate-in fade-in-0 zoom-in-95 duration-300">
          <DialogHeader>
            <DialogTitle>Edit Campaign</DialogTitle>
            <DialogDescription>
              Update campaign status and platform settings.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Campaign Status</Label>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="active-status"
                    checked={editStatus === "active"} 
                    onCheckedChange={(checked) => {
                      if (checked) setEditStatus("active");
                    }}
                  />
                  <Label htmlFor="active-status" className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                    Active
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="paused-status"
                    checked={editStatus === "paused"} 
                    onCheckedChange={(checked) => {
                      if (checked) setEditStatus("paused");
                    }}
                  />
                  <Label htmlFor="paused-status" className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>
                    Paused
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="draft-status"
                    checked={editStatus === "draft"} 
                    onCheckedChange={(checked) => {
                      if (checked) setEditStatus("draft");
                    }}
                  />
                  <Label htmlFor="draft-status" className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-gray-500 mr-2"></div>
                    Draft
                  </Label>
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Platforms</Label>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="google-platform"
                    checked={editPlatforms.includes("google")} 
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setEditPlatforms([...editPlatforms, "google"]);
                      } else {
                        setEditPlatforms(editPlatforms.filter(p => p !== "google"));
                      }
                    }} 
                  />
                  <Label htmlFor="google-platform" className="flex items-center">
                    <SearchIcon className="h-3 w-3 text-red-500 mr-2" />
                    Google
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="meta-platform"
                    checked={editPlatforms.includes("meta")} 
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setEditPlatforms([...editPlatforms, "meta"]);
                      } else {
                        setEditPlatforms(editPlatforms.filter(p => p !== "meta"));
                      }
                    }}
                  />
                  <Label htmlFor="meta-platform" className="flex items-center">
                    <Facebook className="h-3 w-3 text-blue-500 mr-2" />
                    Meta
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="linkedin-platform"
                    checked={editPlatforms.includes("linkedin")} 
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setEditPlatforms([...editPlatforms, "linkedin"]);
                      } else {
                        setEditPlatforms(editPlatforms.filter(p => p !== "linkedin"));
                      }
                    }}
                  />
                  <Label htmlFor="linkedin-platform" className="flex items-center">
                    <Linkedin className="h-3 w-3 text-cyan-500 mr-2" />
                    LinkedIn
                  </Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditCampaign}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Campaign Alert */}
      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent className="animate-in fade-in-0 zoom-in-95 duration-300">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the campaign
              {currentCampaign?.name && <strong> "{currentCampaign.name}"</strong>}. 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCampaign} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CampaignsPage;
