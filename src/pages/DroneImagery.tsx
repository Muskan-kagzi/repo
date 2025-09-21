// import React, { useState } from 'react';
// import { useAuth } from '@/contexts/AuthContext';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Progress } from '@/components/ui/progress';
// import { Badge } from '@/components/ui/badge';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { 
//   Upload, Image, FileVideo, Calendar, MapPin, AlertCircle, 
//   CheckCircle, Clock, Eye, Download, Trash2, Send
// } from 'lucide-react';
// import { format } from 'date-fns';

// interface DroneUpload {
//   id: string;
//   fileName: string;
//   fileSize: string;
//   uploadDate: Date;
//   flightDate: Date;
//   mineId: string;
//   altitude: number;
//   coverage: string;
//   status: 'queued' | 'processing' | 'completed' | 'failed';
//   analysisResults?: {
//     anomaliesDetected: number;
//     riskAreas: number;
//     orthomosaicUrl?: string;
//     pointCloudUrl?: string;
//   };
//   uploadedBy: string;
// }

// export default function DroneImagery() {
//   const { user, hasRole } = useAuth();
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [isUploading, setIsUploading] = useState(false);
//   const [selectedUpload, setSelectedUpload] = useState<DroneUpload | null>(null);

//   // Mock data
//   const recentUploads: DroneUpload[] = [
//     {
//       id: 'drone-001',
//       fileName: 'mine_12_sector_a_20250920.zip',
//       fileSize: '2.4 GB',
//       uploadDate: new Date('2025-09-20T10:30:00'),
//       flightDate: new Date('2025-09-20T08:00:00'),
//       mineId: 'mine-12',
//       altitude: 120,
//       coverage: '15 hectares',
//       status: 'completed',
//       analysisResults: {
//         anomaliesDetected: 3,
//         riskAreas: 2,
//         orthomosaicUrl: '/ortho/001',
//         pointCloudUrl: '/cloud/001'
//       },
//       uploadedBy: 'John Operator'
//     },
//     {
//       id: 'drone-002',
//       fileName: 'mine_12_daily_survey.zip',
//       fileSize: '1.8 GB',
//       uploadDate: new Date('2025-09-19T14:20:00'),
//       flightDate: new Date('2025-09-19T09:00:00'),
//       mineId: 'mine-12',
//       altitude: 100,
//       coverage: '12 hectares',
//       status: 'processing',
//       uploadedBy: 'Sarah Inspector'
//     },
//     {
//       id: 'drone-003',
//       fileName: 'inspection_benches_3_4.zip',
//       fileSize: '956 MB',
//       uploadDate: new Date('2025-09-18T11:15:00'),
//       flightDate: new Date('2025-09-18T07:30:00'),
//       mineId: 'mine-12',
//       altitude: 80,
//       coverage: '8 hectares',
//       status: 'completed',
//       analysisResults: {
//         anomaliesDetected: 1,
//         riskAreas: 1,
//         orthomosaicUrl: '/ortho/003'
//       },
//       uploadedBy: 'John Operator'
//     }
//   ];

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setSelectedFile(e.target.files[0]);
//     }
//   };

//   const simulateUpload = () => {
//     setIsUploading(true);
//     setUploadProgress(0);
    
//     const interval = setInterval(() => {
//       setUploadProgress(prev => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           setIsUploading(false);
//           setSelectedFile(null);
//           return 100;
//         }
//         return prev + 10;
//       });
//     }, 500);
//   };

//   const getStatusBadge = (status: DroneUpload['status']) => {
//     const statusConfig = {
//       queued: { variant: 'secondary' as const, icon: Clock },
//       processing: { variant: 'outline' as const, icon: Clock },
//       completed: { variant: 'default' as const, icon: CheckCircle },
//       failed: { variant: 'destructive' as const, icon: AlertCircle }
//     };

//     const config = statusConfig[status];
//     const Icon = config.icon;

//     return (
//       <Badge variant={config.variant} className="flex items-center gap-1">
//         <Icon className="w-3 h-3" />
//         {status.charAt(0).toUpperCase() + status.slice(1)}
//       </Badge>
//     );
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold text-foreground">Drone Imagery</h1>
//         <p className="text-muted-foreground mt-1">Upload and analyze aerial imagery for risk assessment</p>
//       </div>

//       <Tabs defaultValue="upload" className="space-y-4">
//         <TabsList>
//           <TabsTrigger value="upload">Upload New</TabsTrigger>
//           <TabsTrigger value="recent">Recent Uploads</TabsTrigger>
//           <TabsTrigger value="analysis">Analysis Results</TabsTrigger>
//         </TabsList>

//         <TabsContent value="upload" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Upload Drone Imagery</CardTitle>
//               <CardDescription>
//                 Upload orthomosaics, point clouds, or raw imagery for processing
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {/* File Upload Area */}
//               <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
//                 <input
//                   type="file"
//                   id="file-upload"
//                   className="hidden"
//                   accept=".zip,.tif,.tiff,.las,.laz"
//                   onChange={handleFileSelect}
//                 />
//                 <label htmlFor="file-upload" className="cursor-pointer">
//                   <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
//                   <p className="text-sm font-medium">Click to upload or drag and drop</p>
//                   <p className="text-xs text-muted-foreground mt-2">
//                     ZIP, GeoTIFF, LAS/LAZ (max 5GB)
//                   </p>
//                 </label>
                
//                 {selectedFile && (
//                   <div className="mt-4 p-3 bg-muted rounded-lg text-left">
//                     <p className="text-sm font-medium">{selectedFile.name}</p>
//                     <p className="text-xs text-muted-foreground">
//                       {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
//                     </p>
//                   </div>
//                 )}
//               </div>

//               {/* Metadata Fields */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="flight-date">Flight Date</Label>
//                   <Input type="datetime-local" id="flight-date" />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="altitude">Altitude (m)</Label>
//                   <Input type="number" id="altitude" placeholder="120" />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="camera">Camera/Sensor</Label>
//                   <Input id="camera" placeholder="DJI Phantom 4 RTK" />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="coverage">Coverage Area</Label>
//                   <Input id="coverage" placeholder="15 hectares" />
//                 </div>
//               </div>

//               {/* Upload Progress */}
//               {isUploading && (
//                 <div className="space-y-2">
//                   <div className="flex justify-between text-sm">
//                     <span>Uploading...</span>
//                     <span>{uploadProgress}%</span>
//                   </div>
//                   <Progress value={uploadProgress} />
//                 </div>
//               )}

//               {/* Action Buttons */}
//               <div className="flex justify-end space-x-2">
//                 <Button variant="outline" disabled={isUploading}>
//                   Cancel
//                 </Button>
//                 <Button 
//                   onClick={simulateUpload} 
//                   disabled={!selectedFile || isUploading}
//                 >
//                   <Upload className="w-4 h-4 mr-2" />
//                   Upload & Process
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="recent" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Recent Uploads</CardTitle>
//               <CardDescription>
//                 View and manage your uploaded drone imagery
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {recentUploads.map(upload => (
//                   <div
//                     key={upload.id}
//                     className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
//                     onClick={() => setSelectedUpload(upload)}
//                   >
//                     <div className="flex items-start justify-between">
//                       <div className="space-y-1">
//                         <div className="flex items-center gap-2">
//                           <FileVideo className="w-4 h-4 text-muted-foreground" />
//                           <span className="font-medium">{upload.fileName}</span>
//                           <span className="text-sm text-muted-foreground">({upload.fileSize})</span>
//                         </div>
//                         <div className="flex items-center gap-4 text-sm text-muted-foreground">
//                           <span className="flex items-center gap-1">
//                             <Calendar className="w-3 h-3" />
//                             {format(upload.flightDate, 'MMM dd, yyyy HH:mm')}
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <MapPin className="w-3 h-3" />
//                             {upload.coverage}
//                           </span>
//                           <span>Alt: {upload.altitude}m</span>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         {getStatusBadge(upload.status)}
//                         <div className="flex gap-1">
//                           <Button size="sm" variant="ghost">
//                             <Eye className="w-4 h-4" />
//                           </Button>
//                           <Button size="sm" variant="ghost">
//                             <Download className="w-4 h-4" />
//                           </Button>
//                           {hasRole('main_admin') && (
//                             <Button size="sm" variant="ghost">
//                               <Trash2 className="w-4 h-4" />
//                             </Button>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="analysis" className="space-y-4">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Latest Analysis Results</CardTitle>
//                 <CardDescription>
//                   AI-detected anomalies and risk areas from recent flights
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {recentUploads
//                   .filter(u => u.status === 'completed' && u.analysisResults)
//                   .map(upload => (
//                     <div key={upload.id} className="p-4 border border-border rounded-lg">
//                       <div className="flex justify-between items-start mb-3">
//                         <div>
//                           <p className="font-medium">{upload.fileName}</p>
//                           <p className="text-sm text-muted-foreground">
//                             {format(upload.flightDate, 'MMM dd, yyyy')}
//                           </p>
//                         </div>
//                         <Badge variant="secondary">Analyzed</Badge>
//                       </div>
                      
//                       <div className="grid grid-cols-2 gap-4 text-sm">
//                         <div className="space-y-1">
//                           <p className="text-muted-foreground">Anomalies Detected</p>
//                           <p className="text-2xl font-bold text-risk-high">
//                             {upload.analysisResults?.anomaliesDetected}
//                           </p>
//                         </div>
//                         <div className="space-y-1">
//                           <p className="text-muted-foreground">Risk Areas</p>
//                           <p className="text-2xl font-bold text-risk-medium">
//                             {upload.analysisResults?.riskAreas}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="flex gap-2 mt-4">
//                         <Button size="sm" variant="outline" className="flex-1">
//                           <Image className="w-4 h-4 mr-1" />
//                           View Orthomosaic
//                         </Button>
//                         <Button size="sm" variant="outline" className="flex-1">
//                           <Eye className="w-4 h-4 mr-1" />
//                           3D Model
//                         </Button>
//                       </div>
//                     </div>
//                   ))}
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Processing Queue</CardTitle>
//                 <CardDescription>
//                   Current jobs in the processing pipeline
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-3">
//                   {recentUploads
//                     .filter(u => u.status === 'processing' || u.status === 'queued')
//                     .map(upload => (
//                       <div key={upload.id} className="p-3 border border-border rounded-lg">
//                         <div className="flex justify-between items-center mb-2">
//                           <p className="text-sm font-medium">{upload.fileName}</p>
//                           {getStatusBadge(upload.status)}
//                         </div>
//                         <Progress 
//                           value={upload.status === 'processing' ? 65 : 0} 
//                           className="h-2"
//                         />
//                         <p className="text-xs text-muted-foreground mt-2">
//                           {upload.status === 'processing' 
//                             ? 'Generating orthomosaic and detecting anomalies...' 
//                             : 'Waiting in queue...'}
//                         </p>
//                       </div>
//                     ))}

//                   {recentUploads.filter(u => u.status === 'processing' || u.status === 'queued').length === 0 && (
//                     <div className="text-center py-8 text-muted-foreground">
//                       <CheckCircle className="w-12 h-12 mx-auto mb-2 text-risk-low" />
//                       <p>No jobs in queue</p>
//                       <p className="text-sm">All uploads have been processed</p>
//                     </div>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {hasRole('inspector') && (
//             <Alert>
//               <AlertCircle className="h-4 w-4" />
//               <AlertDescription>
//                 As an inspector, you can request specific area re-flights for verification.
//                 <Button size="sm" variant="outline" className="ml-2">
//                   <Send className="w-4 h-4 mr-1" />
//                   Request Flight
//                 </Button>
//               </AlertDescription>
//             </Alert>
//           )}
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }