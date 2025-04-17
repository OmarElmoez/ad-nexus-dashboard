
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useEffect } from "react";
import { useCampaignStore } from "@/store/useCampaignStore";
import { useAuthStore } from "@/store/useAuthStore";
import { ArrowUpRight, BarChart3, MousePointerClick, Users } from "lucide-react";

const DashboardPage = () => {
  const { user } = useAuthStore();
  const { campaigns, fetchCampaigns } = useCampaignStore();

  useEffect(() => {
    // Only fetch user's campaigns if they're not an admin
    if (user?.role === "admin") {
      fetchCampaigns();
    } else if (user?.id) {
      fetchCampaigns(user.id);
    }
  }, [fetchCampaigns, user]);

  // Calculate totals for stat cards
  const totalImpressions = campaigns.reduce((sum, campaign) => sum + campaign.stats.impressions, 0);
  const totalClicks = campaigns.reduce((sum, campaign) => sum + campaign.stats.clicks, 0);
  const totalConversions = campaigns.reduce((sum, campaign) => sum + campaign.stats.conversions, 0);
  const totalCost = campaigns.reduce((sum, campaign) => sum + campaign.stats.cost, 0);
  const averageCPC = totalClicks > 0 ? totalCost / totalClicks : 0;
  const averageCTR = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;

  // Data for platform distribution chart
  const platformData = [
    { name: "Google", value: campaigns.filter(c => c.platforms.includes("google")).length },
    { name: "Meta", value: campaigns.filter(c => c.platforms.includes("meta")).length },
    { name: "LinkedIn", value: campaigns.filter(c => c.platforms.includes("linkedin")).length },
  ].filter(item => item.value > 0); // Only show platforms with campaigns

  const PLATFORM_COLORS = ["#4285F4", "#1877F2", "#0A66C2"];

  // Data for campaign performance chart
  const performanceData = campaigns.map(campaign => ({
    name: campaign.name,
    clicks: campaign.stats.clicks,
    impressions: campaign.stats.impressions / 100, // Scale down for better visibility
    cost: campaign.stats.cost,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your advertising campaigns and performance metrics.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Impressions</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalImpressions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across {campaigns.length} campaigns
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClicks.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              CTR: {averageCTR.toFixed(2)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Conversions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalConversions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Conv. Rate: {totalClicks > 0 ? ((totalConversions / totalClicks) * 100).toFixed(2) : 0}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Ad Spend</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCost.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Avg. CPC: ${averageCPC.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            {performanceData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={performanceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end"
                    height={70}
                    tick={{fontSize: 12}}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="clicks" fill="#9b87f5" name="Clicks" />
                  <Bar dataKey="impressions" fill="#7E69AB" name="Impressions (÷100)" />
                  <Bar dataKey="cost" fill="#F97316" name="Cost ($)" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-muted-foreground">No campaign data available</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Platform Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            {platformData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={platformData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {platformData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PLATFORM_COLORS[index % PLATFORM_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-muted-foreground">No platform data available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
