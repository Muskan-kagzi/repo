// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { Card } from '@/components/ui/card';
// // import { Input } from '@/components/ui/input';
// // import { Button } from '@/components/ui/button';
// // import { Label } from '@/components/ui/label';
// // import { useAuth } from '@/contexts/AuthContext';
// // import { toast } from '@/components/ui/use-toast';
// // import { Shield, ArrowLeft, User, Lock } from 'lucide-react';

// // export default function Login() {
// //   const navigate = useNavigate();
// //   const { login } = useAuth();
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [isLoading, setIsLoading] = useState(false);

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setIsLoading(true);
    
// //     try {
// //       await login(email, password);
// //       toast({
// //         title: "Login Successful",
// //         description: "Welcome to RockfallAI Dashboard",
// //       });
// //       navigate('/dashboard');
// //     } catch (error) {
// //       toast({
// //         title: "Login Failed",
// //         description: "Invalid credentials. Please try again.",
// //         variant: "destructive",
// //       });
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const demoCredentials = [
// //     { email: 'operator@demo.com', role: 'Mining Operator', color: 'text-primary' },
// //     { email: 'inspector@demo.com', role: 'Inspection Team', color: 'text-info' },
// //     { email: 'admin@demo.com', role: 'Main Admin', color: 'text-risk-high' },
// //     { email: 'site@demo.com', role: 'Site Admin', color: 'text-warning' },
// //   ];

// //   const fillCredentials = (email: string) => {
// //     setEmail(email);
// //     setPassword('demo123');
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-dark flex items-center justify-center p-4">
// //       <div className="w-full max-w-md">
// //         <Button
// //           variant="ghost"
// //           onClick={() => navigate('/')}
// //           className="mb-8 text-muted-foreground hover:text-foreground"
// //         >
// //           <ArrowLeft className="w-4 h-4 mr-2" />
// //           Back to Home
// //         </Button>

// //         <Card className="bg-card border-border">
// //           <div className="p-8">
// //             <div className="flex items-center justify-center mb-8">
// //               <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
// //                 <Shield className="w-8 h-8 text-white" />
// //               </div>
// //             </div>
            
// //             <h1 className="text-2xl font-bold text-center text-foreground mb-2">
// //               Welcome Back
// //             </h1>
// //             <p className="text-center text-muted-foreground mb-8">
// //               Sign in to access the RockfallAI Dashboard
// //             </p>

// //             <form onSubmit={handleSubmit} className="space-y-6">
// //               <div>
// //                 <Label htmlFor="email" className="text-foreground">
// //                   Email Address
// //                 </Label>
// //                 <div className="relative mt-2">
// //                   <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
// //                   <Input
// //                     id="email"
// //                     type="email"
// //                     value={email}
// //                     onChange={(e) => setEmail(e.target.value)}
// //                     className="pl-10 bg-input border-border"
// //                     placeholder="Enter your email"
// //                     required
// //                   />
// //                 </div>
// //               </div>

// //               <div>
// //                 <Label htmlFor="password" className="text-foreground">
// //                   Password
// //                 </Label>
// //                 <div className="relative mt-2">
// //                   <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
// //                   <Input
// //                     id="password"
// //                     type="password"
// //                     value={password}
// //                     onChange={(e) => setPassword(e.target.value)}
// //                     className="pl-10 bg-input border-border"
// //                     placeholder="Enter your password"
// //                     required
// //                   />
// //                 </div>
// //               </div>

// //               <Button
// //                 type="submit"
// //                 disabled={isLoading}
// //                 className="w-full bg-gradient-primary hover:opacity-90 text-white"
// //               >
// //                 {isLoading ? 'Signing in...' : 'Sign In'}
// //               </Button>
// //             </form>

// //             <div className="mt-8 pt-8 border-t border-border">
// //               <p className="text-sm text-muted-foreground text-center mb-4">
// //                 Demo Credentials (click to use)
// //               </p>
// //               <div className="space-y-2">
// //                 {demoCredentials.map((cred) => (
// //                   <button
// //                     key={cred.email}
// //                     onClick={() => fillCredentials(cred.email)}
// //                     className="w-full text-left p-3 rounded-lg bg-secondary hover:bg-muted transition-colors"
// //                   >
// //                     <div className="flex items-center justify-between">
// //                       <span className={`text-sm font-medium ${cred.color}`}>
// //                         {cred.role}
// //                       </span>
// //                       <span className="text-xs text-muted-foreground">
// //                         {cred.email}
// //                       </span>
// //                     </div>
// //                   </button>
// //                 ))}
// //               </div>
// //               <p className="text-xs text-muted-foreground text-center mt-4">
// //                 Password: demo123
// //               </p>
// //             </div>
// //           </div>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // }




// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Card } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Label } from '@/components/ui/label';
// import { useAuth } from '@/contexts/AuthContext';
// import { toast } from '@/components/ui/use-toast';
// import { Shield, ArrowLeft, User, Lock } from 'lucide-react';

// export default function Login() {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const res = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username: email, password }),
//       });

//       if (!res.ok) throw new Error("Invalid credentials");
//       const data = await res.json();

//       // Save user in AuthContext
//       // login(data.user);
//       await login(email, password);

//       toast({
//         title: "Login Successful",
//         description: `Welcome ${data.user.name} to RockfallAI Dashboard`,
//       });

//       navigate('/dashboard');
//     } catch (error) {
//       toast({
//         title: "Login Failed",
//         description: "Invalid credentials. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const demoCredentials = [
//     { email: 'operator@demo.com', role: 'Mining Operator', color: 'text-primary' },
//     { email: 'inspector@demo.com', role: 'Inspection Team', color: 'text-info' },
//     { email: 'admin@demo.com', role: 'Main Admin', color: 'text-risk-high' },
//     { email: 'site@demo.com', role: 'Site Admin', color: 'text-warning' },
//   ];

//   const fillCredentials = (email: string) => {
//     setEmail(email);
//     setPassword('demo123');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-dark flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <Button
//           variant="ghost"
//           onClick={() => navigate('/')}
//           className="mb-8 text-muted-foreground hover:text-foreground"
//         >
//           <ArrowLeft className="w-4 h-4 mr-2" />
//           Back to Home
//         </Button>

//         <Card className="bg-card border-border">
//           <div className="p-8">
//             <div className="flex items-center justify-center mb-8">
//               <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
//                 <Shield className="w-8 h-8 text-white" />
//               </div>
//             </div>
            
//             <h1 className="text-2xl font-bold text-center text-foreground mb-2">
//               Welcome Back
//             </h1>
//             <p className="text-center text-muted-foreground mb-8">
//               Sign in to access the RockfallAI Dashboard
//             </p>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <Label htmlFor="email" className="text-foreground">
//                   Email Address
//                 </Label>
//                 <div className="relative mt-2">
//                   <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
//                   <Input
//                     id="email"
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="pl-10 bg-input border-border"
//                     placeholder="Enter your email"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <Label htmlFor="password" className="text-foreground">
//                   Password
//                 </Label>
//                 <div className="relative mt-2">
//                   <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
//                   <Input
//                     id="password"
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="pl-10 bg-input border-border"
//                     placeholder="Enter your password"
//                     required
//                   />
//                 </div>
//               </div>

//               <Button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full bg-gradient-primary hover:opacity-90 text-white"
//               >
//                 {isLoading ? 'Signing in...' : 'Sign In'}
//               </Button>
//             </form>

//             <div className="mt-8 pt-8 border-t border-border">
//               <p className="text-sm text-muted-foreground text-center mb-4">
//                 Demo Credentials (click to use)
//               </p>
//               <div className="space-y-2">
//                 {demoCredentials.map((cred) => (
//                   <button
//                     key={cred.email}
//                     onClick={() => fillCredentials(cred.email)}
//                     className="w-full text-left p-3 rounded-lg bg-secondary hover:bg-muted transition-colors"
//                   >
//                     <div className="flex items-center justify-between">
//                       <span className={`text-sm font-medium ${cred.color}`}>
//                         {cred.role}
//                       </span>
//                       <span className="text-xs text-muted-foreground">
//                         {cred.email}
//                       </span>
//                     </div>
//                   </button>
//                 ))}
//               </div>
//               <p className="text-xs text-muted-foreground text-center mt-4">
//                 Password: demo123
//               </p>
//             </div>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }





import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Shield, ArrowLeft, User, Lock } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      if (!res.ok) throw new Error("Invalid credentials");
      const data = await res.json();

      await login(email, password);

      toast({
        title: "Login Successful",
        description: `Welcome ${data.user.name} to RockfallAI Dashboard`,
      });

      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const demoCredentials = [
    { email: 'operator@demo.com', role: 'Mining Operator', color: 'text-primary' },
    { email: 'inspector@demo.com', role: 'Inspection Team', color: 'text-info' },
    { email: 'admin@demo.com', role: 'Main Admin', color: 'text-risk-high' },
    { email: 'site@demo.com', role: 'Site Admin', color: 'text-warning' },
  ];

  const fillCredentials = (email: string) => {
    setEmail(email);
    setPassword('demo123');
  };

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-8 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="bg-card border-border">
          <div className="p-8">
            <div className="flex items-center justify-center mb-8">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-center text-foreground mb-2">
              Welcome Back
            </h1>
            <p className="text-center text-muted-foreground mb-8">
              Sign in to access the RockfallAI Dashboard
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-foreground">
                  Email Address
                </Label>
                <div className="relative mt-2">
                  <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-input border-border"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-foreground">
                  Password
                </Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-input border-border"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-primary hover:opacity-90 text-white"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* ✅ Added Sign Up section here */}
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Don't have an account?
              </p>
              <Button
                variant="outline"
                onClick={() => navigate('/signup')}
                className="w-full bg-white border border-green-500 text-green-600 hover:bg-green-50"
              >
                Sign Up
              </Button>
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground text-center mb-4">
                Demo Credentials (click to use)
              </p>
              <div className="space-y-2">
                {demoCredentials.map((cred) => (
                  <button
                    key={cred.email}
                    onClick={() => fillCredentials(cred.email)}
                    className="w-full text-left p-3 rounded-lg bg-secondary hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${cred.color}`}>
                        {cred.role}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {cred.email}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground text-center mt-4">
                Password: demo123
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

