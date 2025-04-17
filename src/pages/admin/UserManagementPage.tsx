
import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { useCampaignStore } from "@/store/useCampaignStore";

const UserManagementPage = () => {
  const { users, fetchUsers, updateUser } = useUserStore();
  const { campaigns, fetchCampaigns, toggleCampaignStatus } = useCampaignStore();
  
  useEffect(() => {
    fetchUsers();
    fetchCampaigns();
  }, [fetchUsers, fetchCampaigns]);
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  
  const getUserCampaigns = (userId: string) => {
    return campaigns.filter(campaign => campaign.userId === userId);
  };
  
  // Toggle all campaigns for a specific user
  const toggleAllUserCampaigns = (userId: string, enable: boolean) => {
    const userCampaigns = getUserCampaigns(userId);
    userCampaigns.forEach(campaign => {
      if ((enable && campaign.status !== "active") || (!enable && campaign.status === "active")) {
        toggleCampaignStatus(campaign.id);
      }
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">
          Manage users and their advertising campaigns.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            View and manage users and their campaign access.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Campaigns</TableHead>
                <TableHead>Campaign Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length > 0 ? (
                users.map((user) => {
                  const userCampaigns = getUserCampaigns(user.id);
                  const hasActiveCampaigns = userCampaigns.some(c => c.status === "active");
                  
                  return (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-medium">{user.name}</span>
                            <span className="text-sm text-muted-foreground">{user.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.role === "admin" ? "default" : "outline"}>
                          {user.role === "admin" ? "Admin" : "User"}
                        </Badge>
                      </TableCell>
                      <TableCell>{userCampaigns.length}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Switch 
                            checked={hasActiveCampaigns}
                            onCheckedChange={(checked) => toggleAllUserCampaigns(user.id, checked)}
                            disabled={userCampaigns.length === 0}
                          />
                          <span>
                            {hasActiveCampaigns ? "Some Active" : "All Paused"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button 
                            variant={user.role === "admin" ? "destructive" : "default"}
                            size="sm"
                            onClick={() => {
                              updateUser(user.id, { 
                                role: user.role === "admin" ? "user" : "admin" 
                              });
                            }}
                          >
                            {user.role === "admin" ? "Remove Admin" : "Make Admin"}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <p className="text-muted-foreground">No users found.</p>
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

export default UserManagementPage;
