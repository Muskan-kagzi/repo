import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  TrendingUp,TrendingDown, Minus, Clock, Calendar,
  AlertTriangle, Download, RefreshCw, ChevronRight
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from '@/components/ui/progress';

export default function Forecasts() {
  const { user, hasRole } = useAuth();
  const [timeRange, setTimeRange] = useState('24h');
  const [selectedZone, setSelectedZone] = useState('all');

  const forecasts = [
    {
      id: 'f1',
      zone: 'Zone A - North Wall',
      currentRisk: 72,
      predictedRisk: 85,
      trend: 'increasing',
      confidence: 87,
      nextUpdate: '2 hours',
      factors: ['Heavy rainfall', 'Displacement detected', 'Pore pressure rising']
    },
    {
      id: 'f2',
      zone: 'Zone B - East Terrace',
      currentRisk: 45,
      predictedRisk: 62,
      trend: 'increasing',
      confidence: 78,
      nextUpdate: '2 hours',
      factors: ['Moderate displacement', 'Stable conditions']
    },
    {
      id: 'f3',
      zone: 'Zone C - South Ramp',
      currentRisk: 28,
      predictedRisk: 25,
      trend: 'decreasing',
      confidence: 92,
      nextUpdate: '2 hours',
      factors: ['Stable conditions', 'Low activity']
    },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="w-4 h-4 text-risk-high" />;
      case 'decreasing': return <TrendingDown className="w-4 h-4 text-risk-low" />;
      default: return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getRiskLevel = (risk: number) => {
    if (risk >= 70) return { level: 'High', color: 'text-risk-high' };
    if (risk >= 40) return { level: 'Medium', color: 'text-risk-medium' };
    return { level: 'Low', color: 'text-risk-low' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Risk Forecasts</h1>
          <p className="text-muted-foreground mt-2">
            AI-powered predictions and trend analysis
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6h">Next 6 Hours</SelectItem>
              <SelectItem value="24h">Next 24 Hours</SelectItem>
              <SelectItem value="48h">Next 48 Hours</SelectItem>
              <SelectItem value="7d">Next 7 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <RefreshCw className="w-4 h-4" />
          </Button>
          {hasRole(['operator', 'inspector', 'main_admin']) && (
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Overall Risk</span>
            <AlertTriangle className="w-4 h-4 text-risk-high" />
          </div>
          <div className="text-2xl font-bold text-risk-high">High</div>
          <p className="text-xs text-muted-foreground mt-1">3 zones at elevated risk</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Model Confidence</span>
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-bold">86%</div>
          <Progress value={86} className="mt-2" />
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Next Update</span>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">1h 45m</div>
          <p className="text-xs text-muted-foreground mt-1">Continuous monitoring</p>
        </Card>
      </div>

      {/* Detailed Forecasts */}
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Zone Forecasts</h2>
          <div className="space-y-4">
            {forecasts.map((forecast) => {
              const currentRiskLevel = getRiskLevel(forecast.currentRisk);
              const predictedRiskLevel = getRiskLevel(forecast.predictedRisk);
              
              return (
                <div key={forecast.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium">{forecast.zone}</h3>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">Current:</span>
                          <span className={`font-bold ${currentRiskLevel.color}`}>
                            {forecast.currentRisk}%
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">Predicted:</span>
                          <span className={`font-bold ${predictedRiskLevel.color}`}>
                            {forecast.predictedRisk}%
                          </span>
                        </div>
                        {getTrendIcon(forecast.trend)}
                      </div>
                    </div>
                    <Badge variant={predictedRiskLevel.level === 'High' ? 'destructive' : 'secondary'}>
                      {predictedRiskLevel.level} Risk
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <span className="text-xs text-muted-foreground">Confidence</span>
                      <Progress value={forecast.confidence} className="mt-1" />
                      <span className="text-xs text-muted-foreground">{forecast.confidence}%</span>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Next Update</span>
                      <p className="text-sm font-medium mt-1">{forecast.nextUpdate}</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-muted-foreground">Contributing Factors:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {forecast.factors.map((factor, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {factor}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {hasRole(['operator', 'inspector']) && (
                    <div className="flex space-x-2 mt-3">
                      <Button size="sm" variant="outline">View Details</Button>
                      {forecast.predictedRisk >= 70 && (
                        <Button size="sm" variant="destructive">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Take Action
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* ML Model Info - Only for admins */}
      {hasRole(['main_admin', 'site_admin']) && (
        <Card className="p-6">
          <h3 className="font-semibold mb-3">Model Information</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Model Version:</span>
              <p className="font-medium">v2.3.1</p>
            </div>
            <div>
              <span className="text-muted-foreground">Last Training:</span>
              <p className="font-medium">2 days ago</p>
            </div>
            <div>
              <span className="text-muted-foreground">Accuracy:</span>
              <p className="font-medium">92.3%</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}