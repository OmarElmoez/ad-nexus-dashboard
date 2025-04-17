
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCampaignStore } from "@/store/useCampaignStore";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search, Shield, User } from "lucide-react";

const UserManagementPage = () => {
  const { users, fetchUsers, updateUser } = useUserStore();
  const { campaigns, fetchCampaigns, toggleCampaignStatus } = useCampaignStore();
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  
  // Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  
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
  
  // Filter and paginate users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });
  
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
          <div className="flex flex-col md:flex-row gap-4 mt-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              value={roleFilter}
              onValueChange={setRoleFilter}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => {
                setItemsPerPage(parseInt(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Rows per page" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="5">5 per page</SelectItem>
                  <SelectItem value="10">10 per page</SelectItem>
                  <SelectItem value="20">20 per page</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
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
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => {
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
                        <Badge variant={user.role === "admin" ? "default" : "outline"}
                               className={user.role === "admin" ? "bg-purple-500" : ""}>
                          {user.role === "admin" ? (
                            <div className="flex items-center gap-1">
                              <Shield className="w-3 h-3 mr-1" />
                              Admin
                            </div>
                          ) : (
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3 mr-1" />
                              User
                            </div>
                          )}
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
                          <span className={hasActiveCampaigns ? "text-green-500" : "text-gray-500"}>
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
                    {searchTerm || roleFilter !== "all" ? (
                      <p className="text-muted-foreground">No users match your search criteria.</p>
                    ) : (
                      <p className="text-muted-foreground">No users found.</p>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          
          {filteredUsers.length > 0 && (
            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} 
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: Math.min(totalPages, 5) }).map((_, idx) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = idx + 1;
                    } else if (currentPage <= 3) {
                      pageNum = idx + 1;
                      if (idx === 4) return (
                        <PaginationItem key={idx}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + idx;
                      if (idx === 0) return (
                        <PaginationItem key={idx}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    } else {
                      if (idx === 0) return (
                        <PaginationItem key={idx}>
                          <PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
                        </PaginationItem>
                      );
                      if (idx === 1) return (
                        <PaginationItem key={idx}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                      if (idx === 3) return (
                        <PaginationItem key={idx}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                      if (idx === 4) return (
                        <PaginationItem key={idx}>
                          <PaginationLink onClick={() => handlePageChange(totalPages)}>{totalPages}</PaginationLink>
                        </PaginationItem>
                      );
                      pageNum = currentPage;
                    }
                    
                    return (
                      <PaginationItem key={idx}>
                        <PaginationLink
                          onClick={() => handlePageChange(pageNum)}
                          isActive={pageNum === currentPage}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} 
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagementPage;
