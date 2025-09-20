// import React, { useState } from 'react';
// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { useAuth } from '@/contexts/AuthContext';
// import { 
//   AlertTriangle, FileText, Plus, MapPin, 
//   Clock, User, CheckCircle, XCircle, Info,
//   Paperclip, Camera, Download
// } from 'lucide-react';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Incident } from '@/types';

// export default function Incidents() {
//   const { user, hasRole } = useAuth();
//   const [showReportDialog, setShowReportDialog] = useState(false);
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
//   const [showVerifyDialog, setShowVerifyDialog] = useState(false);
//   const [verificationNotes, setVerificationNotes] = useState('');
  
//   // Form state for new incident
//   const [newIncident, setNewIncident] = useState({
//     title: '',
//     description: '',
//     severity: 'Medium' as 'Low' | 'Medium' | 'High',
//     location: '',
//   });

//   const incidents: Incident[] = [
//     {
//       id: 'inc-001',
//       mineId: 'mine-12',
//       reportedBy: 'op-42',
//       title: 'Small rockfall near bench 3',
//       description: 'Observed loose boulder approximately 2m diameter. Minor cracks visible in surrounding area.',
//       severity: 'Medium',
//       geom: { type: 'Point', coordinates: [82.124, 24.346] },
//       status: 'Verified',
//       createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
//       verifiedBy: 'ins-01',
//       verifiedAt: new Date(Date.now() - 1000 * 60 * 30),
//       verificationNotes: 'Confirmed via drone inspection. Area cordoned off.',
//       attachments: ['image1.jpg', 'image2.jpg'],
//     },
//     {
//       id: 'inc-002',
//       mineId: 'mine-12',
//       reportedBy: 'op-43',
//       title: 'Unusual displacement in Zone B',
//       description: 'Sensor readings show unexpected movement. Visual inspection requested.',
//       severity: 'High',
//       geom: { type: 'Point', coordinates: [82.125, 24.347] },
//       status: 'Reported',
//       createdAt: new Date(Date.now() - 1000 * 60 * 45),
//     },
//     {
//       id: 'inc-003',
//       mineId: 'mine-12',
//       reportedBy: 'op-42',
//       title: 'Water accumulation in pit',
//       description: 'Excessive water pooling after recent rainfall. May affect stability.',
//       severity: 'Low',
//       geom: { type: 'Point', coordinates: [82.126, 24.348] },
//       status: 'NeedsInfo',
//       createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
//       attachments: ['water_pool.jpg'],
//     },
//     {
//       id: 'inc-004',
//       mineId: 'mine-12',
//       reportedBy: 'op-44',
//       title: 'False alarm - equipment malfunction',
//       description: 'Initial report was due to faulty sensor. No actual risk.',
//       severity: 'Low',
//       geom: { type: 'Point', coordinates: [82.127, 24.349] },
//       status: 'Rejected',
//       createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
//       verifiedBy: 'ins-01',
//       verifiedAt: new Date(Date.now() - 1000 * 60 * 60 * 20),
//       verificationNotes: 'Sensor malfunction confirmed. Maintenance scheduled.',
//     },
//   ];

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case 'Verified': return <CheckCircle className="w-4 h-4 text-risk-low" />;
//       case 'Rejected': return <XCircle className="w-4 h-4 text-risk-high" />;
//       case 'NeedsInfo': return <Info className="w-4 h-4 text-risk-medium" />;
//       default: return <Clock className="w-4 h-4 text-muted-foreground" />;
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'Verified': return 'text-risk-low';
//       case 'Rejected': return 'text-risk-high';
//       case 'NeedsInfo': return 'text-risk-medium';
//       default: return 'text-muted-foreground';
//     }
//   };

//   const getSeverityBadge = (severity: string) => {
//     const variant = severity === 'High' ? 'destructive' : severity === 'Medium' ? 'secondary' : 'outline';
//     return <Badge variant={variant}>{severity}</Badge>;
//   };

//   const filteredIncidents = incidents.filter(incident => {
//     if (filterStatus === 'all') return true;
//     return incident.status === filterStatus;
//   });

//   const handleReportIncident = () => {
//     // In real app, this would call the API
//     console.log('Reporting incident:', newIncident);
//     setShowReportDialog(false);
//     setNewIncident({ title: '', description: '', severity: 'Medium', location: '' });
//   };

//   const handleVerifyIncident = (status: 'Verified' | 'Rejected' | 'NeedsInfo') => {
//     if (selectedIncident) {
//       // In real app, this would call the API
//       console.log('Verifying incident:', selectedIncident.id, status, verificationNotes);
//       setShowVerifyDialog(false);
//       setVerificationNotes('');
//       setSelectedIncident(null);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-start">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">Incident Management</h1>
//           <p className="text-muted-foreground mt-2">
//             Report and track safety incidents
//           </p>
//         </div>
//         {hasRole(['operator', 'inspector']) && (
//           <Button onClick={() => setShowReportDialog(true)}>
//             <Plus className="w-4 h-4 mr-2" />
//             Report Incident
//           </Button>
//         )}
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card className="p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-muted-foreground">Total Incidents</p>
//               <p className="text-2xl font-bold">{incidents.length}</p>
//             </div>
//             <FileText className="w-8 h-8 text-primary" />
//           </div>
//         </Card>
//         <Card className="p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-muted-foreground">Pending Review</p>
//               <p className="text-2xl font-bold text-risk-medium">
//                 {incidents.filter(i => i.status === 'Reported').length}
//               </p>
//             </div>
//             <Clock className="w-8 h-8 text-risk-medium" />
//           </div>
//         </Card>
//         <Card className="p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-muted-foreground">Verified</p>
//               <p className="text-2xl font-bold text-risk-low">
//                 {incidents.filter(i => i.status === 'Verified').length}
//               </p>
//             </div>
//             <CheckCircle className="w-8 h-8 text-risk-low" />
//           </div>
//         </Card>
//         <Card className="p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-muted-foreground">High Severity</p>
//               <p className="text-2xl font-bold text-risk-high">
//                 {incidents.filter(i => i.severity === 'High').length}
//               </p>
//             </div>
//             <AlertTriangle className="w-8 h-8 text-risk-high" />
//           </div>
//         </Card>
//       </div>

//       {/* Filter */}
//       <Card className="p-4">
//         <div className="flex items-center space-x-4">
//           <span className="text-sm text-muted-foreground">Status:</span>
//           <Select value={filterStatus} onValueChange={setFilterStatus}>
//             <SelectTrigger className="w-[200px]">
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Incidents</SelectItem>
//               <SelectItem value="Reported">Reported</SelectItem>
//               <SelectItem value="Verified">Verified</SelectItem>
//               <SelectItem value="Rejected">Rejected</SelectItem>
//               <SelectItem value="NeedsInfo">Needs Information</SelectItem>
//             </SelectContent>
//           </Select>
//           {hasRole(['inspector', 'main_admin']) && (
//             <Button variant="outline" className="ml-auto">
//               <Download className="w-4 h-4 mr-2" />
//               Export Report
//             </Button>
//           )}
//         </div>
//       </Card>

//       {/* Incident List */}
//       <Card>
//         <div className="p-6">
//           <h2 className="text-xl font-semibold mb-4">Incident Reports</h2>
//           <div className="space-y-3">
//             {filteredIncidents.map((incident) => (
//               <div key={incident.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
//                 <div className="flex items-start justify-between">
//                   <div className="flex-1">
//                     <div className="flex items-center space-x-2 mb-2">
//                       {getSeverityBadge(incident.severity)}
//                       <div className={`flex items-center space-x-1 ${getStatusColor(incident.status)}`}>
//                         {getStatusIcon(incident.status)}
//                         <span className="text-sm font-medium">{incident.status}</span>
//                       </div>
//                       <span className="text-sm text-muted-foreground">
//                         {new Date(incident.createdAt).toLocaleString()}
//                       </span>
//                     </div>
                    
//                     <h3 className="font-semibold mb-1">{incident.title}</h3>
//                     <p className="text-sm text-muted-foreground mb-2">{incident.description}</p>
                    
//                     <div className="flex items-center space-x-4 text-sm">
//                       <span className="flex items-center text-muted-foreground">
//                         <User className="w-3 h-3 mr-1" />
//                         Reported by {incident.reportedBy}
//                       </span>
//                       <span className="flex items-center text-muted-foreground">
//                         <MapPin className="w-3 h-3 mr-1" />
//                         [{incident.geom.coordinates.join(', ')}]
//                       </span>
//                       {incident.attachments && incident.attachments.length > 0 && (
//                         <span className="flex items-center text-muted-foreground">
//                           <Paperclip className="w-3 h-3 mr-1" />
//                           {incident.attachments.length} attachments
//                         </span>
//                       )}
//                     </div>

//                     {incident.verificationNotes && (
//                       <div className="mt-2 p-2 bg-muted rounded text-sm">
//                         <span className="font-medium">Verification: </span>
//                         {incident.verificationNotes}
//                         <span className="text-muted-foreground ml-2">
//                           - {incident.verifiedBy}
//                         </span>
//                       </div>
//                     )}
//                   </div>

//                   <div className="flex space-x-2 ml-4">
//                     {hasRole('inspector') && incident.status === 'Reported' && (
//                       <Button 
//                         size="sm" 
//                         variant="default"
//                         onClick={() => {
//                           setSelectedIncident(incident);
//                           setShowVerifyDialog(true);
//                         }}
//                       >
//                         Verify
//                       </Button>
//                     )}
//                     <Button size="sm" variant="outline">
//                       View Details
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </Card>

//       {/* Report Incident Dialog */}
//       <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
//         <DialogContent className="max-w-2xl">
//           <DialogHeader>
//             <DialogTitle>Report New Incident</DialogTitle>
//             <DialogDescription>
//               Provide details about the observed incident
//             </DialogDescription>
//           </DialogHeader>
//           <div className="space-y-4">
//             <div>
//               <label className="text-sm font-medium">Title</label>
//               <Input
//                 value={newIncident.title}
//                 onChange={(e) => setNewIncident({...newIncident, title: e.target.value})}
//                 placeholder="Brief description of the incident"
//                 className="mt-1"
//               />
//             </div>
//             <div>
//               <label className="text-sm font-medium">Description</label>
//               <Textarea
//                 value={newIncident.description}
//                 onChange={(e) => setNewIncident({...newIncident, description: e.target.value})}
//                 placeholder="Detailed description of what was observed..."
//                 className="mt-1"
//                 rows={4}
//               />
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="text-sm font-medium">Severity</label>
//                 <Select 
//                   value={newIncident.severity} 
//                   onValueChange={(value: 'Low' | 'Medium' | 'High') => 
//                     setNewIncident({...newIncident, severity: value})
//                   }
//                 >
//                   <SelectTrigger className="mt-1">
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Low">Low</SelectItem>
//                     <SelectItem value="Medium">Medium</SelectItem>
//                     <SelectItem value="High">High</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div>
//                 <label className="text-sm font-medium">Location</label>
//                 <Input
//                   value={newIncident.location}
//                   onChange={(e) => setNewIncident({...newIncident, location: e.target.value})}
//                   placeholder="Zone or coordinates"
//                   className="mt-1"
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="text-sm font-medium">Attachments</label>
//               <div className="mt-1 border-2 border-dashed rounded-lg p-4 text-center">
//                 <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
//                 <p className="text-sm text-muted-foreground">
//                   Drag and drop files or click to browse
//                 </p>
//               </div>
//             </div>
//           </div>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setShowReportDialog(false)}>
//               Cancel
//             </Button>
//             <Button 
//               onClick={handleReportIncident}
//               disabled={!newIncident.title || !newIncident.description}
//             >
//               Report Incident
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Verify Incident Dialog */}
//       {hasRole('inspector') && (
//         <Dialog open={showVerifyDialog} onOpenChange={setShowVerifyDialog}>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Verify Incident</DialogTitle>
//               <DialogDescription>
//                 Review and verify the reported incident
//               </DialogDescription>
//             </DialogHeader>
//             <div className="space-y-4">
//               <div>
//                 <p className="text-sm text-muted-foreground mb-1">Incident:</p>
//                 <p className="font-medium">{selectedIncident?.title}</p>
//                 <p className="text-sm text-muted-foreground mt-1">{selectedIncident?.description}</p>
//               </div>
//               <div>
//                 <label className="text-sm font-medium">Verification Notes</label>
//                 <Textarea
//                   value={verificationNotes}
//                   onChange={(e) => setVerificationNotes(e.target.value)}
//                   placeholder="Provide verification details..."
//                   className="mt-1"
//                   rows={3}
//                 />
//               </div>
//             </div>
//             <DialogFooter className="flex space-x-2">
//               <Button 
//                 variant="outline" 
//                 onClick={() => handleVerifyIncident('NeedsInfo')}
//               >
//                 Request Info
//               </Button>
//               <Button 
//                 variant="destructive" 
//                 onClick={() => handleVerifyIncident('Rejected')}
//               >
//                 Reject
//               </Button>
//               <Button 
//                 onClick={() => handleVerifyIncident('Verified')}
//               >
//                 Verify
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       )}
//     </div>
//   );
// }






"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import {
  AlertTriangle,
  FileText,
  Plus,
  MapPin,
  Clock,
  User,
  CheckCircle,
  XCircle,
  Info,
  Paperclip,
  Camera,
  Download,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// ✅ Type for incidents (if you don’t have it in "@/types")
interface Incident {
  id: string;
  mineId: string;
  reportedBy: string;
  title: string;
  description: string;
  severity: "Low" | "Medium" | "High";
  geom: { type: string; coordinates: number[] };
  status: "Reported" | "Verified" | "Rejected" | "NeedsInfo";
  createdAt: Date;
  verifiedBy?: string;
  verifiedAt?: Date;
  verificationNotes?: string;
  attachments?: string[];
}

export default function IncidentPage() {
  const { user, hasRole } = useAuth();
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [showVerifyDialog, setShowVerifyDialog] = useState(false);
  const [verificationNotes, setVerificationNotes] = useState("");

  // Form state for new incident
  const [newIncident, setNewIncident] = useState({
    title: "",
    description: "",
    severity: "Medium" as "Low" | "Medium" | "High",
    location: "",
  });

  // Dummy data (later connect with API)
  const incidents: Incident[] = [
    {
      id: "inc-001",
      mineId: "mine-12",
      reportedBy: "op-42",
      title: "Small rockfall near bench 3",
      description:
        "Observed loose boulder approximately 2m diameter. Minor cracks visible in surrounding area.",
      severity: "Medium",
      geom: { type: "Point", coordinates: [82.124, 24.346] },
      status: "Verified",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
      verifiedBy: "ins-01",
      verifiedAt: new Date(Date.now() - 1000 * 60 * 30),
      verificationNotes: "Confirmed via drone inspection. Area cordoned off.",
      attachments: ["image1.jpg", "image2.jpg"],
    },
    {
      id: "inc-002",
      mineId: "mine-12",
      reportedBy: "op-43",
      title: "Unusual displacement in Zone B",
      description: "Sensor readings show unexpected movement. Visual inspection requested.",
      severity: "High",
      geom: { type: "Point", coordinates: [82.125, 24.347] },
      status: "Reported",
      createdAt: new Date(Date.now() - 1000 * 60 * 45),
    },
    {
      id: "inc-003",
      mineId: "mine-12",
      reportedBy: "op-42",
      title: "Water accumulation in pit",
      description: "Excessive water pooling after recent rainfall. May affect stability.",
      severity: "Low",
      geom: { type: "Point", coordinates: [82.126, 24.348] },
      status: "NeedsInfo",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
      attachments: ["water_pool.jpg"],
    },
    {
      id: "inc-004",
      mineId: "mine-12",
      reportedBy: "op-44",
      title: "False alarm - equipment malfunction",
      description: "Initial report was due to faulty sensor. No actual risk.",
      severity: "Low",
      geom: { type: "Point", coordinates: [82.127, 24.349] },
      status: "Rejected",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      verifiedBy: "ins-01",
      verifiedAt: new Date(Date.now() - 1000 * 60 * 60 * 20),
      verificationNotes: "Sensor malfunction confirmed. Maintenance scheduled.",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Verified":
        return <CheckCircle className="w-4 h-4 text-risk-low" />;
      case "Rejected":
        return <XCircle className="w-4 h-4 text-risk-high" />;
      case "NeedsInfo":
        return <Info className="w-4 h-4 text-risk-medium" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Verified":
        return "text-risk-low";
      case "Rejected":
        return "text-risk-high";
      case "NeedsInfo":
        return "text-risk-medium";
      default:
        return "text-muted-foreground";
    }
  };

  const getSeverityBadge = (severity: string) => {
    const variant =
      severity === "High"
        ? "destructive"
        : severity === "Medium"
        ? "secondary"
        : "outline";
    return <Badge variant={variant}>{severity}</Badge>;
  };

  const filteredIncidents = incidents.filter((incident) => {
    if (filterStatus === "all") return true;
    return incident.status === filterStatus;
  });

  const handleReportIncident = () => {
    // TODO: Replace with API call
    console.log("Reporting incident:", newIncident);
    setShowReportDialog(false);
    setNewIncident({ title: "", description: "", severity: "Medium", location: "" });
  };

  const handleVerifyIncident = (status: "Verified" | "Rejected" | "NeedsInfo") => {
    if (selectedIncident) {
      // TODO: Replace with API call
      console.log("Verifying incident:", selectedIncident.id, status, verificationNotes);
      setShowVerifyDialog(false);
      setVerificationNotes("");
      setSelectedIncident(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Incident Management</h1>
          <p className="text-muted-foreground mt-2">Report and track safety incidents</p>
        </div>
        {hasRole(["operator", "inspector"]) && (
          <Button onClick={() => setShowReportDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Report Incident
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Incidents</p>
              <p className="text-2xl font-bold">{incidents.length}</p>
            </div>
            <FileText className="w-8 h-8 text-primary" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending Review</p>
              <p className="text-2xl font-bold text-risk-medium">
                {incidents.filter((i) => i.status === "Reported").length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-risk-medium" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Verified</p>
              <p className="text-2xl font-bold text-risk-low">
                {incidents.filter((i) => i.status === "Verified").length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-risk-low" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">High Severity</p>
              <p className="text-2xl font-bold text-risk-high">
                {incidents.filter((i) => i.severity === "High").length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-risk-high" />
          </div>
        </Card>
      </div>

      {/* Filter */}
      <Card className="p-4">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">Status:</span>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Incidents</SelectItem>
              <SelectItem value="Reported">Reported</SelectItem>
              <SelectItem value="Verified">Verified</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
              <SelectItem value="NeedsInfo">Needs Information</SelectItem>
            </SelectContent>
          </Select>
          {hasRole(["inspector", "main_admin"]) && (
            <Button variant="outline" className="ml-auto">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          )}
        </div>
      </Card>

      {/* Incident List */}
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Incident Reports</h2>
          <div className="space-y-3">
            {filteredIncidents.map((incident) => (
              <div
                key={incident.id}
                className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {getSeverityBadge(incident.severity)}
                      <div
                        className={`flex items-center space-x-1 ${getStatusColor(
                          incident.status
                        )}`}
                      >
                        {getStatusIcon(incident.status)}
                        <span className="text-sm font-medium">{incident.status}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(incident.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <h3 className="font-semibold mb-1">{incident.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {incident.description}
                    </p>

                    <div className="flex items-center space-x-4 text-sm">
                      <span className="flex items-center text-muted-foreground">
                        <User className="w-3 h-3 mr-1" />
                        Reported by {incident.reportedBy}
                      </span>
                      <span className="flex items-center text-muted-foreground">
                        <MapPin className="w-3 h-3 mr-1" />
                        [{incident.geom.coordinates.join(", ")}]
                      </span>
                      {incident.attachments && incident.attachments.length > 0 && (
                        <span className="flex items-center text-muted-foreground">
                          <Paperclip className="w-3 h-3 mr-1" />
                          {incident.attachments.length} attachments
                        </span>
                      )}
                    </div>

                    {incident.verificationNotes && (
                      <div className="mt-2 p-2 bg-muted rounded text-sm">
                        <span className="font-medium">Verification: </span>
                        {incident.verificationNotes}
                        <span className="text-muted-foreground ml-2">
                          - {incident.verifiedBy}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2 ml-4">
                    {hasRole("inspector") && incident.status === "Reported" && (
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => {
                          setSelectedIncident(incident);
                          setShowVerifyDialog(true);
                        }}
                      >
                        Verify
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Report Incident Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Report New Incident</DialogTitle>
            <DialogDescription>Provide details about the observed incident</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input
                value={newIncident.title}
                onChange={(e) => setNewIncident({ ...newIncident, title: e.target.value })}
                placeholder="Brief description of the incident"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={newIncident.description}
                onChange={(e) =>
                  setNewIncident({ ...newIncident, description: e.target.value })
                }
                placeholder="Detailed description of what was observed..."
                className="mt-1"
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Severity</label>
                <Select
                  value={newIncident.severity}
                  onValueChange={(value: "Low" | "Medium" | "High") =>
                    setNewIncident({ ...newIncident, severity: value })
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Location</label>
                <Input
                  value={newIncident.location}
                  onChange={(e) =>
                    setNewIncident({ ...newIncident, location: e.target.value })
                  }
                  placeholder="Zone or coordinates"
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Attachments</label>
              <div className="mt-1 border-2 border-dashed rounded-lg p-4 text-center">
                <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Drag and drop files or click to browse
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReportDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleReportIncident}
              disabled={!newIncident.title || !newIncident.description}
            >
              Report Incident
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Verify Incident Dialog */}
      {hasRole("inspector") && (
        <Dialog open={showVerifyDialog} onOpenChange={setShowVerifyDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Verify Incident</DialogTitle>
              <DialogDescription>Review and verify the reported incident</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Incident:</p>
                <p className="font-medium">{selectedIncident?.title}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedIncident?.description}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">Verification Notes</label>
                <Textarea
                  value={verificationNotes}
                  onChange={(e) => setVerificationNotes(e.target.value)}
                  placeholder="Provide verification details..."
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter className="flex space-x-2">
              <Button variant="outline" onClick={() => handleVerifyIncident("NeedsInfo")}>
                Request Info
              </Button>
              <Button variant="destructive" onClick={() => handleVerifyIncident("Rejected")}>
                Reject
              </Button>
              <Button onClick={() => handleVerifyIncident("Verified")}>Verify</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
