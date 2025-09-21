// import React, { useState } from 'react';
// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { useAuth } from '@/contexts/AuthContext';
// import { 
//   MapPin, AlertTriangle, Activity, ZoomIn, ZoomOut, 
//   Layers, Navigation, Filter, Download 
// } from 'lucide-react';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// export default function RiskMap() {
//   const { user, hasRole } = useAuth();
//   const [selectedZone, setSelectedZone] = useState<string | null>(null);
//   const [riskFilter, setRiskFilter] = useState('all');

//   const riskZones = [
//     { id: 'zone-a', name: 'Zone A - North Wall', risk: 'High', cells: 24, coordinates: [82.123, 24.345] },
//     { id: 'zone-b', name: 'Zone B - East Terrace', risk: 'Medium', cells: 18, coordinates: [82.124, 24.346] },
//     { id: 'zone-c', name: 'Zone C - South Ramp', risk: 'Low', cells: 32, coordinates: [82.125, 24.347] },
//     { id: 'zone-d', name: 'Zone D - West Pit', risk: 'Medium', cells: 28, coordinates: [82.126, 24.348] },
//   ];

//   const getRiskColor = (risk: string) => {
//     switch (risk) {
//       case 'High': return 'bg-risk-high';
//       case 'Medium': return 'bg-risk-medium';
//       case 'Low': return 'bg-risk-low';
//       default: return 'bg-muted';
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-start">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">Risk Map</h1>
//           <p className="text-muted-foreground mt-2">
//             Real-time visualization of rockfall risk zones
//           </p>
//         </div>
//         <div className="flex space-x-2">
//           {hasRole(['operator', 'inspector']) && (
//             <Button variant="outline">
//               <Download className="w-4 h-4 mr-2" />
//               Export Map
//             </Button>
//           )}
//           <Badge variant="outline" className="text-risk-low">
//             <Activity className="w-3 h-3 mr-1" />
//             Live Monitoring
//           </Badge>
//         </div>
//       </div>

//       {/* Map Controls */}
//       <Card className="p-4">
//         <div className="flex items-center justify-between">
//           <div className="flex space-x-2">
//             <Button variant="outline" size="sm">
//               <ZoomIn className="w-4 h-4" />
//             </Button>
//             <Button variant="outline" size="sm">
//               <ZoomOut className="w-4 h-4" />
//             </Button>
//             <Button variant="outline" size="sm">
//               <Layers className="w-4 h-4" />
//             </Button>
//             <Button variant="outline" size="sm">
//               <Navigation className="w-4 h-4" />
//             </Button>
//           </div>
//           <div className="flex items-center space-x-2">
//             <Filter className="w-4 h-4 text-muted-foreground" />
//             <Select value={riskFilter} onValueChange={setRiskFilter}>
//               <SelectTrigger className="w-[150px]">
//                 <SelectValue placeholder="Filter by risk" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Zones</SelectItem>
//                 <SelectItem value="high">High Risk</SelectItem>
//                 <SelectItem value="medium">Medium Risk</SelectItem>
//                 <SelectItem value="low">Low Risk</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//       </Card>

//       {/* Map Container */}
//       <div className="grid lg:grid-cols-3 gap-6">
//         {/* Main Map */}
//         <Card className="lg:col-span-2 h-[600px] bg-gradient-dark">
//           <div className="p-6 h-full flex items-center justify-center">
//             <div className="text-center">
//               <MapPin className="w-12 h-12 text-muted-foreground mb-4 mx-auto" />
//               <p className="text-muted-foreground">
//                 Interactive 3D map will be rendered here
//               </p>
//               <p className="text-sm text-muted-foreground mt-2">
//                 Using Mapbox/Cesium for visualization
//               </p>
//             </div>
//           </div>
//         </Card>

//         {/* Zone Details */}
//         <div className="space-y-4">
//           <Card className="p-4">
//             <h3 className="font-semibold mb-3">Risk Zones</h3>
//             <div className="space-y-2">
//               {riskZones.map((zone) => (
//                 <div
//                   key={zone.id}
//                   className={`p-3 rounded-lg border cursor-pointer transition-colors ${
//                     selectedZone === zone.id ? 'bg-accent' : 'hover:bg-muted'
//                   }`}
//                   onClick={() => setSelectedZone(zone.id)}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-2">
//                       <div className={`w-2 h-2 rounded-full ${getRiskColor(zone.risk)}`} />
//                       <span className="text-sm font-medium">{zone.name}</span>
//                     </div>
//                     <Badge variant={zone.risk === 'High' ? 'destructive' : 'secondary'}>
//                       {zone.risk}
//                     </Badge>
//                   </div>
//                   <div className="mt-1 text-xs text-muted-foreground">
//                     {zone.cells} cells • [{zone.coordinates.join(', ')}]
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </Card>

//           {/* Risk Legend */}
//           <Card className="p-4">
//             <h3 className="font-semibold mb-3">Risk Legend</h3>
//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-2">
//                   <div className="w-4 h-4 bg-risk-high rounded" />
//                   <span className="text-sm">High Risk</span>
//                 </div>
//                 <span className="text-xs text-muted-foreground">&gt; 70%</span>
//               </div>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-2">
//                   <div className="w-4 h-4 bg-risk-medium rounded" />
//                   <span className="text-sm">Medium Risk</span>
//                 </div>
//                 <span className="text-xs text-muted-foreground">40-70%</span>
//               </div>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-2">
//                   <div className="w-4 h-4 bg-risk-low rounded" />
//                   <span className="text-sm">Low Risk</span>
//                 </div>
//                 <span className="text-xs text-muted-foreground">&lt; 40%</span>
//               </div>
//             </div>
//           </Card>

//           {/* Zone Actions */}
//           {selectedZone && hasRole(['operator', 'inspector']) && (
//             <Card className="p-4">
//               <h3 className="font-semibold mb-3">Zone Actions</h3>
//               <div className="space-y-2">
//                 <Button className="w-full" variant="outline" size="sm">
//                   <AlertTriangle className="w-4 h-4 mr-2" />
//                   Report Incident
//                 </Button>
//                 <Button className="w-full" variant="outline" size="sm">
//                   View Sensors
//                 </Button>
//                 <Button className="w-full" variant="outline" size="sm">
//                   Historical Data
//                 </Button>
//               </div>
//             </Card>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useState } from 'react';
// Add this line at the top of the file, with your other imports

import heroImage from '../assets/iage2.png';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  MapPin, AlertTriangle, Activity, ZoomIn, ZoomOut, 
  Layers, Navigation, Filter, Download 
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Import the map component
// import Map from './Map';
import Map from "./Map";

export default function RiskMap() {
  const { user, hasRole } = useAuth();
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [riskFilter, setRiskFilter] = useState('all');

  const riskZones = [
    { id: 'zone-a', name: 'Zone A - North Wall', risk: 'High', cells: 24, coordinates: [82.123, 24.345] },
    { id: 'zone-b', name: 'Zone B - East Terrace', risk: 'Medium', cells: 18, coordinates: [82.124, 24.346] },
    { id: 'zone-c', name: 'Zone C - South Ramp', risk: 'Low', cells: 32, coordinates: [82.125, 24.347] },
    { id: 'zone-d', name: 'Zone D - West Pit', risk: 'Medium', cells: 28, coordinates: [82.126, 24.348] },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'bg-risk-high';
      case 'Medium': return 'bg-risk-medium';
      case 'Low': return 'bg-risk-low';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Risk Map</h1>
          <p className="text-muted-foreground mt-2">
            Real-time visualization of rockfall risk zones
          </p>
        </div>
        <div className="flex space-x-2">
          {hasRole(['operator', 'inspector']) && (
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Map
            </Button>
          )}
          <Badge variant="outline" className="text-risk-low">
            <Activity className="w-3 h-3 mr-1" />
            Live Monitoring
          </Badge>
        </div>
      </div>

      {/* Map Controls */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Layers className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Navigation className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by risk" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Zones</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Map + Details */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Interactive Map */}
        {/* <Card className="lg:col-span-2 h-[600px]"> */}
          {/* <Map />   🔥 Map component embedded here */}
        {/* </Card> */}
{/* <Card className="lg:col-span-2 h-[600px]">
  <iframe
    src="http://localhost:3000/map/run-pipeline"
    className="w-full h-full border-0 rounded-lg"
  />
</Card> */}

{/* React/TSX */}




{/* <Card className="lg:col-span-2 h-[600px]">
  <a
    href="/image.png"
    target="_blank"
    rel="noopener noreferrer"
    className="block w-full h-full border rounded-lg overflow-hidden"
  >
    <img
      src="../../iage2.png" 
      alt="Rockfall"
      className="w-full h-full object-contain"
    />
  </a>
</Card> */}

<Card className="lg:col-span-2 h-[399px] w-[885px]">
  <a
    href={heroImage}
    target="_blank"
    rel="noopener noreferrer"
    className="block w-full h-full border rounded-lg overflow-hidden"
  >
    <img
      src={heroImage}
      alt="Rockfall"
      className="w-885 h-390 object-contain"
    />
  </a>
</Card>




        {/* Zone Details */}
        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Risk Zones</h3>
            <div className="space-y-2">
              {riskZones.map((zone) => (
                <div
                  key={zone.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedZone === zone.id ? 'bg-accent' : 'hover:bg-muted'
                  }`}
                  onClick={() => setSelectedZone(zone.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getRiskColor(zone.risk)}`} />
                      <span className="text-sm font-medium">{zone.name}</span>
                    </div>
                    <Badge variant={zone.risk === 'High' ? 'destructive' : 'secondary'}>
                      {zone.risk}
                    </Badge>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {zone.cells} cells • [{zone.coordinates.join(', ')}]
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Risk Legend */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Risk Legend</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-risk-high rounded" />
                  <span className="text-sm">High Risk</span>
                </div>
                <span className="text-xs text-muted-foreground">&gt; 70%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-risk-medium rounded" />
                  <span className="text-sm">Medium Risk</span>
                </div>
                <span className="text-xs text-muted-foreground">40-70%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-risk-low rounded" />
                  <span className="text-sm">Low Risk</span>
                </div>
                <span className="text-xs text-muted-foreground">&lt; 40%</span>
              </div>
            </div>
          </Card>

          {/* Zone Actions */}
          {selectedZone && hasRole(['operator', 'inspector']) && (
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Zone Actions</h3>
              <div className="space-y-2">
                <Button className="w-full" variant="outline" size="sm">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Report Incident
                </Button>
                <Button className="w-full" variant="outline" size="sm">
                  View Sensors
                </Button>
                <Button className="w-full" variant="outline" size="sm">
                  Historical Data
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
