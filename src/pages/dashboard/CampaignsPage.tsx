
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  Trash2,
  CheckCircle2,
  CircleDashed,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Campaign, PlatformConnection, PlatformType } from "@/store/useCampaignStore";

const CampaignsPage = () => {
  const { user } = useAuthStore();
  const { 
    campaigns, 
    connections,
    fetchCampaigns, 
    toggleCampaignStatus, 
    deleteCampaign, 
    createCampaign, 
    updateCampaign,
    connectPlatform 
  } = useCampaignStore();
  
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
  const [status, setStatus] = useState<"active" | "paused" | "draft">("draft");
  
  // Form states for edit dialog
  const [editStatus, setEditStatus] = useState<"active" | "paused" | "draft">("active");
  const [editPlatforms, setEditPlatforms] = useState<PlatformType[]>([]);
  
  // Platform connection dialog
  const [isPlatformDialogOpen, setIsPlatformDialogOpen] = useState(false);
  const [connectingPlatform, setConnectingPlatform] = useState<PlatformType | null>(null);
  const [accountId, setAccountId] = useState("");
  
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
      status,
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
    setStatus("draft");
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

  const handleConnectPlatform = async () => {
    if (!connectingPlatform || !accountId) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    await connectPlatform(connectingPlatform, accountId);
    toast.success(`${connectingPlatform} account connected successfully!`);
    setIsPlatformDialogOpen(false);
    setConnectingPlatform(null);
    setAccountId("");
  };

  const togglePlatformSelection = (platform: PlatformType) => {
    if (platforms.includes(platform)) {
      setPlatforms(platforms.filter(p => p !== platform));
    } else {
      setPlatforms([...platforms, platform]);
    }
  };

  const toggleEditPlatformSelection = (platform: PlatformType) => {
    if (editPlatforms.includes(platform)) {
      setEditPlatforms(editPlatforms.filter(p => p !== platform));
    } else {
      setEditPlatforms([...editPlatforms, platform]);
    }
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
          <Badge className="status-badge status-badge-active flex items-center gap-1">
            <Play className="h-3 w-3" />
            Active
          </Badge>
        );
      case "paused":
        return (
          <Badge variant="outline" className="status-badge status-badge-paused flex items-center gap-1">
            <Pause className="h-3 w-3" />
            Paused
          </Badge>
        );
      case "draft":
        return (
          <Badge variant="outline" className="status-badge status-badge-draft flex items-center gap-1">
            <CircleDashed className="h-3 w-3" />
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
        <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-brand-purple hover:bg-brand-dark-purple">
          <Plus className="mr-2 h-4 w-4" />
          New Campaign
        </Button>
      </div>

      {/* Platform Connection Icons */}
      <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-r from-gray-50 to-white">
        <CardHeader>
          <CardTitle className="text-lg">Platform Connections</CardTitle>
          <CardDescription>
            Connect your ad accounts to import campaigns and data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {/* Google */}
            {connections.find(c => c.type === "google") ? (
              <div className="flex flex-col items-center">
                <div className="platform-icon platform-icon-google platform-icon-selected">
                  <SearchIcon className="h-6 w-6" />
                </div>
                <span className="mt-2 text-xs font-medium flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-green-500" />
                  Connected
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div 
                  className="platform-icon platform-icon-google cursor-pointer"
                  onClick={() => {
                    setConnectingPlatform("google");
                    setIsPlatformDialogOpen(true);
                  }}
                >
                  <SearchIcon className="h-6 w-6" />
                </div>
                <span className="mt-2 text-xs font-medium text-muted-foreground">Google Ads</span>
              </div>
            )}
            
            {/* Meta */}
            {connections.find(c => c.type === "meta") ? (
              <div className="flex flex-col items-center">
                <div className="platform-icon platform-icon-meta platform-icon-selected">
                  <Facebook className="h-6 w-6" />
                </div>
                <span className="mt-2 text-xs font-medium flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-green-500" />
                  Connected
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div 
                  className="platform-icon platform-icon-meta cursor-pointer"
                  onClick={() => {
                    setConnectingPlatform("meta");
                    setIsPlatformDialogOpen(true);
                  }}
                >
                  <Facebook className="h-6 w-6" />
                </div>
                <span className="mt-2 text-xs font-medium text-muted-foreground">Meta Ads</span>
              </div>
            )}
            
            {/* LinkedIn */}
            {connections.find(c => c.type === "linkedin") ? (
              <div className="flex flex-col items-center">
                <div className="platform-icon platform-icon-linkedin platform-icon-selected">
                  <Linkedin className="h-6 w-6" />
                </div>
                <span className="mt-2 text-xs font-medium flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-green-500" />
                  Connected
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div 
                  className="platform-icon platform-icon-linkedin cursor-pointer"
                  onClick={() => {
                    setConnectingPlatform("linkedin");
                    setIsPlatformDialogOpen(true);
                  }}
                >
                  <Linkedin className="h-6 w-6" />
                </div>
                <span className="mt-2 text-xs font-medium text-muted-foreground">LinkedIn Ads</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-white to-gray-50">
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
                      <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-brand-purple hover:bg-brand-dark-purple">
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
              <Label>Campaign Status</Label>
              <RadioGroup value={status} onValueChange={(value) => setStatus(value as any)}>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="active" id="active" />
                    <Label htmlFor="active" className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                      Active
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paused" id="paused" />
                    <Label htmlFor="paused" className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-amber-500 mr-1"></div>
                      Paused
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="draft" id="draft" />
                    <Label htmlFor="draft" className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-gray-400 mr-1"></div>
                      Draft
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
            
            <div className="grid gap-2">
              <Label>Platforms</Label>
              <div className="flex flex-wrap gap-4">
                <div 
                  className={cn(
                    "platform-icon platform-icon-google cursor-pointer",
                    platforms.includes("google") && "platform-icon-selected ring-red-400"
                  )}
                  onClick={() => togglePlatformSelection("google")}
                >
                  <SearchIcon className="h-6 w-6" />
                  {platforms.includes("google") && (
                    <Check className="absolute top-0 right-0 h-4 w-4 text-red-600 bg-white rounded-full" />
                  )}
                </div>
                <div 
                  className={cn(
                    "platform-icon platform-icon-meta cursor-pointer",
                    platforms.includes("meta") && "platform-icon-selected ring-blue-400"
                  )}
                  onClick={() => togglePlatformSelection("meta")}
                >
                  <Facebook className="h-6 w-6" />
                  {platforms.includes("meta") && (
                    <Check className="absolute top-0 right-0 h-4 w-4 text-blue-600 bg-white rounded-full" />
                  )}
                </div>
                <div 
                  className={cn(
                    "platform-icon platform-icon-linkedin cursor-pointer",
                    platforms.includes("linkedin") && "platform-icon-selected ring-cyan-400"
                  )}
                  onClick={() => togglePlatformSelection("linkedin")}
                >
                  <Linkedin className="h-6 w-6" />
                  {platforms.includes("linkedin") && (
                    <Check className="absolute top-0 right-0 h-4 w-4 text-cyan-600 bg-white rounded-full" />
                  )}
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
            <Button onClick={handleCreateCampaign} className="bg-brand-purple hover:bg-brand-dark-purple">
              Create Campaign
            </Button>
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
              <RadioGroup value={editStatus} onValueChange={(value) => setEditStatus(value as any)}>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="active" id="edit-active" />
                    <Label htmlFor="edit-active" className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      Active
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paused" id="edit-paused" />
                    <Label htmlFor="edit-paused" className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>
                      Paused
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="draft" id="edit-draft" />
                    <Label htmlFor="edit-draft" className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-gray-400 mr-2"></div>
                      Draft
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
            <div className="grid gap-2">
              <Label>Platforms</Label>
              <div className="flex flex-wrap gap-4">
                <div 
                  className={cn(
                    "platform-icon platform-icon-google cursor-pointer",
                    editPlatforms.includes("google") && "platform-icon-selected ring-red-400"
                  )}
                  onClick={() => toggleEditPlatformSelection("google")}
                >
                  <SearchIcon className="h-6 w-6" />
                  {editPlatforms.includes("google") && (
                    <Check className="absolute top-0 right-0 h-4 w-4 text-red-600 bg-white rounded-full" />
                  )}
                </div>
                <div 
                  className={cn(
                    "platform-icon platform-icon-meta cursor-pointer",
                    editPlatforms.includes("meta") && "platform-icon-selected ring-blue-400"
                  )}
                  onClick={() => toggleEditPlatformSelection("meta")}
                >
                  <Facebook className="h-6 w-6" />
                  {editPlatforms.includes("meta") && (
                    <Check className="absolute top-0 right-0 h-4 w-4 text-blue-600 bg-white rounded-full" />
                  )}
                </div>
                <div 
                  className={cn(
                    "platform-icon platform-icon-linkedin cursor-pointer",
                    editPlatforms.includes("linkedin") && "platform-icon-selected ring-cyan-400"
                  )}
                  onClick={() => toggleEditPlatformSelection("linkedin")}
                >
                  <Linkedin className="h-6 w-6" />
                  {editPlatforms.includes("linkedin") && (
                    <Check className="absolute top-0 right-0 h-4 w-4 text-cyan-600 bg-white rounded-full" />
                  )}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditCampaign} className="bg-brand-purple hover:bg-brand-dark-purple">
              Save Changes
            </Button>
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
      
      {/* Platform Connection Dialog */}
      <Dialog open={isPlatformDialogOpen} onOpenChange={setIsPlatformDialogOpen}>
        <DialogContent className="sm:max-w-[450px] animate-in fade-in-0 zoom-in-95 duration-300">
          <DialogHeader>
            <DialogTitle>Connect {connectingPlatform?.charAt(0).toUpperCase() + connectingPlatform?.slice(1)} Account</DialogTitle>
            <DialogDescription>
              Enter your account ID to connect your {connectingPlatform} advertising account.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="accountId">Account ID</Label>
              <Input
                id="accountId"
                placeholder="Enter your account ID"
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPlatformDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConnectPlatform} className="bg-brand-purple hover:bg-brand-dark-purple">
              Connect Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CampaignsPage;
