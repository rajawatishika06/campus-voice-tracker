import React, { useState, useEffect, useMemo } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Search, 
  Filter, 
  ThumbsUp, 
  ShieldCheck, 
  User, 
  MessageSquare, 
  Star, 
  FileText, 
  TrendingUp, 
  Activity, 
  ChevronRight, 
  Send, 
  Upload, 
  Download, 
  X, 
  Sun, 
  Moon, 
  Building, 
  Flame, 
  BarChart2, 
  PieChart, 
  Grid, 
  RefreshCw, 
  AlertCircle,
  MessageCircle,
  Check,
  Zap,
  Tag
} from 'lucide-react';

// --- INITIAL MOCK DATA ---
const INITIAL_COMPLAINTS = [
  {
    id: "CMP-2026-001",
    title: "Library 3rd Floor Wi-Fi Extremely Unstable",
    category: "IT & Wi-Fi",
    location: "Main Library, 3rd Floor Quiet Zone",
    priority: "High",
    status: "In Progress",
    description: "The Wi-Fi connection continuously drops every 5 minutes in the study cubicles. Multiple students are unable to submit online assignments or research properly.",
    isAnonymous: false,
    author: "Alex Rivera",
    studentId: "STU-88219",
    createdAt: "2026-10-25T10:30:00Z",
    assignedTo: "Rajesh Kumar (Network Ops)",
    upvotes: 34,
    upvotedBy: ["user-2", "user-3", "user-4"],
    attachment: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=600",
    timeline: [
      { step: "Submitted", time: "Oct 25, 10:30 AM", note: "Complaint logged by student." },
      { step: "Assigned", time: "Oct 25, 01:15 PM", note: "Assigned to Network Operations Team." },
      { step: "In Progress", time: "Oct 26, 09:00 AM", note: "Technician inspecting access point AP-304." }
    ],
    comments: [
      { id: 1, author: "Rajesh Kumar (Staff)", text: "We've identified a rogue router causing interference. Replacing AP hardware today.", timestamp: "Oct 26, 11:20 AM", isStaff: true },
      { id: 2, author: "Samira Khan", text: "Same problem near the elevators on 3rd floor as well!", timestamp: "Oct 26, 02:45 PM", isStaff: false }
    ],
    rating: null,
    feedback: ""
  },
  {
    id: "CMP-2026-002",
    title: "Hostel Block B Room 204 Air Conditioner Water Leakage",
    category: "Academic & Hostels",
    location: "Hostel Block B, Room 204",
    priority: "Medium",
    status: "Pending",
    description: "Water is continuously dripping from the split AC unit onto the study desk. Poses risk of electrical damage to personal electronics.",
    isAnonymous: false,
    author: "Jordan Lee",
    studentId: "STU-94012",
    createdAt: "2026-10-26T14:15:00Z",
    assignedTo: "Unassigned",
    upvotes: 8,
    upvotedBy: [],
    attachment: null,
    timeline: [
      { step: "Submitted", time: "Oct 26, 02:15 PM", note: "Ticket raised." }
    ],
    comments: [],
    rating: null,
    feedback: ""
  },
  {
    id: "CMP-2026-003",
    title: "Broken Streetlight Near South Gate Pedestrian Crossing",
    category: "Safety & Security",
    location: "Pathway near South Gate & Science Block",
    priority: "Urgent",
    status: "Resolved",
    description: "The LED streetlight post #14 has been dark for three nights. It's pitch dark around 8 PM, creating critical safety concerns for late evening lab students.",
    isAnonymous: true,
    author: "Anonymous Student",
    studentId: null,
    createdAt: "2026-10-22T19:40:00Z",
    assignedTo: "Campus Electrical Unit",
    upvotes: 56,
    upvotedBy: ["user-1"],
    attachment: "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&q=80&w=600",
    timeline: [
      { step: "Submitted", time: "Oct 22, 07:40 PM", note: "Urgent safety report submitted." },
      { step: "Assigned", time: "Oct 23, 08:00 AM", note: "Assigned to Campus Electrical Dispatch." },
      { step: "In Progress", time: "Oct 23, 10:30 AM", note: "Bulb fixture and wiring inspection underway." },
      { step: "Resolved", time: "Oct 24, 04:00 PM", note: "High-intensity LED unit replaced and verified." }
    ],
    comments: [
      { id: 1, author: "Electrical Dispatch", text: "Work completed on Oct 24 afternoon.", timestamp: "Oct 24, 04:05 PM", isStaff: true }
    ],
    rating: 5,
    feedback: "Super fast response time! Thanks for keeping the campus safe at night."
  },
  {
    id: "CMP-2026-004",
    title: "Restroom Exhaust Fan & Water Pressure Defect",
    category: "Maintenance & Facilities",
    location: "Engineering Complex Block 2, Level 1",
    priority: "Medium",
    status: "In Progress",
    description: "The main washroom exhaust fan is out of order and water pressure in taps is too low during peak afternoon hours.",
    isAnonymous: false,
    author: "Priya Sharma",
    studentId: "STU-77301",
    createdAt: "2026-10-26T20:00:00Z",
    assignedTo: "Plumbing & Sanitation Team",
    upvotes: 19,
    upvotedBy: [],
    attachment: null,
    timeline: [
      { step: "Submitted", time: "Oct 26, 08:00 PM", note: "Complaint logged." },
      { step: "In Progress", time: "Oct 27, 09:00 AM", note: "Plumbing crew replacing pressure valve." }
    ],
    comments: [],
    rating: null,
    feedback: ""
  },
  {
    id: "CMP-2026-005",
    title: "Projector Audio Distortion in Lecture Hall 102",
    category: "Academic & Hostels",
    location: "Engineering Complex - Room 102",
    priority: "Low",
    status: "Pending",
    description: "The built-in ceiling speakers produce loud static buzz whenever sound is played during lectures.",
    isAnonymous: false,
    author: "David Miller",
    studentId: "STU-55109",
    createdAt: "2026-10-27T11:00:00Z",
    assignedTo: "Unassigned",
    upvotes: 6,
    upvotedBy: [],
    attachment: null,
    timeline: [
      { step: "Submitted", time: "Oct 27, 11:00 AM", note: "Reported by class representative." }
    ],
    comments: [],
    rating: null,
    feedback: ""
  }
];

const CATEGORIES = [
  "IT & Wi-Fi",
  "Maintenance & Facilities",
  "Safety & Security",
  "Academic & Hostels"
];

const PRIORITIES = ["Low", "Medium", "High", "Urgent"];
const STATUSES = ["Pending", "In Progress", "Resolved"];

export default function App() {
  // LocalStorage initialization
  const [complaints, setComplaints] = useState(() => {
    const saved = localStorage.getItem('campus_voice_complaints_v2');
    return saved ? JSON.parse(saved) : INITIAL_COMPLAINTS;
  });

  const [role, setRole] = useState('student'); // 'student' | 'admin'
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'complaints', 'kanban', 'analytics'
  
  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'upvotes', 'priority'

  // Modals
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // Form State for New Complaint
  const [newForm, setNewForm] = useState({
    title: '',
    category: 'IT & Wi-Fi',
    location: '',
    priority: 'Medium',
    description: '',
    isAnonymous: false,
    authorName: 'Current Student',
    attachmentUrl: ''
  });

  // Action form states
  const [newNoteText, setNewNoteText] = useState('');
  const [starRating, setStarRating] = useState(5);
  const [feedbackComment, setFeedbackComment] = useState('');

  // Persist LocalStorage
  useEffect(() => {
    localStorage.setItem('campus_voice_complaints_v2', JSON.stringify(complaints));
  }, [complaints]);

  // Keep modal data in sync
  useEffect(() => {
    if (selectedComplaint) {
      const updated = complaints.find(c => c.id === selectedComplaint.id);
      if (updated) setSelectedComplaint(updated);
    }
  }, [complaints]);

  // Create Complaint Handler
  const handleCreateComplaint = (e) => {
    e.preventDefault();
    if (!newForm.title || !newForm.description || !newForm.location) {
      return;
    }

    const newTicket = {
      id: `CMP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newForm.title,
      category: newForm.category,
      location: newForm.location,
      priority: newForm.priority,
      status: 'Pending',
      description: newForm.description,
      isAnonymous: newForm.isAnonymous,
      author: newForm.isAnonymous ? 'Anonymous Student' : (newForm.authorName || 'Student'),
      studentId: newForm.isAnonymous ? null : 'STU-' + Math.floor(10000 + Math.random() * 90000),
      createdAt: new Date().toISOString(),
      assignedTo: 'Unassigned',
      upvotes: 1,
      upvotedBy: ['user-self'],
      attachment: newForm.attachmentUrl || null,
      timeline: [
        { 
          step: 'Submitted', 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }), 
          note: 'Complaint submitted by student.' 
        }
      ],
      comments: [],
      rating: null,
      feedback: ''
    };

    setComplaints([newTicket, ...complaints]);
    setIsNewModalOpen(false);
    setNewForm({
      title: '',
      category: 'IT & Wi-Fi',
      location: '',
      priority: 'Medium',
      description: '',
      isAnonymous: false,
      authorName: 'Current Student',
      attachmentUrl: ''
    });
  };

  // Upvote Action
  const handleUpvote = (id, e) => {
    e?.stopPropagation();
    setComplaints(prev => prev.map(c => {
      if (c.id === id) {
        const hasUpvoted = c.upvotedBy?.includes('user-self');
        const newUpvotedBy = hasUpvoted 
          ? c.upvotedBy.filter(u => u !== 'user-self')
          : [...(c.upvotedBy || []), 'user-self'];
        return {
          ...c,
          upvotes: hasUpvoted ? c.upvotes - 1 : c.upvotes + 1,
          upvotedBy: newUpvotedBy
        };
      }
      return c;
    }));
  };

  // Comments / Staff Notes
  const handleAddComment = (id) => {
    if (!newNoteText.trim()) return;
    const isStaff = role === 'admin';
    const authorName = isStaff ? 'Admin / Facilities Dispatch' : 'Student Comment';

    const newCommentObj = {
      id: Date.now(),
      author: authorName,
      text: newNoteText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }),
      isStaff
    };

    setComplaints(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          comments: [...c.comments, newCommentObj]
        };
      }
      return c;
    }));
    setNewNoteText('');
  };

  // Admin Status & Staff Assignment
  const handleAdminUpdateStatus = (id, newStatus, newAssignee) => {
    setComplaints(prev => prev.map(c => {
      if (c.id === id) {
        const updatedTimeline = [...c.timeline];
        if (newStatus && newStatus !== c.status) {
          updatedTimeline.push({
            step: newStatus,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }),
            note: `Status updated to "${newStatus}" by admin.`
          });
        }
        return {
          ...c,
          status: newStatus || c.status,
          assignedTo: newAssignee !== undefined ? newAssignee : c.assignedTo,
          timeline: updatedTimeline
        };
      }
      return c;
    }));
  };

  // Rating Feedback Submission
  const handleRatingSubmit = (id) => {
    setComplaints(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          rating: starRating,
          feedback: feedbackComment
        };
      }
      return c;
    }));
    setFeedbackComment('');
  };

  // CSV Export for Admin
  const handleExportCSV = () => {
    const headers = ["ID,Title,Category,Priority,Status,Location,Created At,Upvotes,Assigned To"];
    const rows = filteredComplaints.map(c => 
      `"${c.id}","${c.title.replace(/"/g, '""')}","${c.category}","${c.priority}","${c.status}","${c.location.replace(/"/g, '""')}","${c.createdAt}",${c.upvotes},"${c.assignedTo}"`
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `campus_complaints_export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered & Sorted Data
  const filteredComplaints = useMemo(() => {
    return complaints.filter(c => {
      const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            c.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
      const matchesPriority = selectedPriority === 'All' || c.priority === selectedPriority;
      const matchesStatus = selectedStatus === 'All' || c.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
    }).sort((a, b) => {
      if (sortBy === 'upvotes') return b.upvotes - a.upvotes;
      if (sortBy === 'priority') {
        const pWeight = { Urgent: 4, High: 3, Medium: 2, Low: 1 };
        return pWeight[b.priority] - pWeight[a.priority];
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [complaints, searchTerm, selectedCategory, selectedPriority, selectedStatus, sortBy]);

  // SLA & Analytics Data
  const stats = useMemo(() => {
    const total = complaints.length;
    const pending = complaints.filter(c => c.status === 'Pending').length;
    const inProgress = complaints.filter(c => c.status === 'In Progress').length;
    const resolved = complaints.filter(c => c.status === 'Resolved').length;
    const urgent = complaints.filter(c => c.priority === 'Urgent' && c.status !== 'Resolved').length;
    const resolvedRatio = total > 0 ? Math.round((resolved / total) * 100) : 0;

    const catCounts = CATEGORIES.reduce((acc, cat) => {
      acc[cat] = complaints.filter(c => c.category === cat).length;
      return acc;
    }, {});

    return { total, pending, inProgress, resolved, urgent, resolvedRatio, catCounts };
  }, [complaints]);

  // Priority color tags
  const getPriorityBadge = (p) => {
    switch (p) {
      case 'Urgent': return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-800 font-bold';
      case 'High': return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-800 font-bold';
      case 'Medium': return 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-300 dark:border-sky-800 font-semibold';
      default: return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700 font-medium';
    }
  };

  // Status badge tags
  const getStatusBadge = (s) => {
    switch (s) {
      case 'Resolved': return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800';
      case 'In Progress': return 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-300 dark:border-indigo-800';
      default: return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-800'; // Pending
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* 1. HEADER & NAVIGATION */}
      <header className={`sticky top-0 z-30 backdrop-blur-md border-b transition-colors ${darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200 shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo & Title */}
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/30">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 bg-clip-text text-transparent">
                  Campus Voice
                </span>
                <span className="hidden sm:inline-block ml-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  Tracker
                </span>
              </div>
            </div>

            {/* Controls Right */}
            <div className="flex items-center space-x-3">
              
              {/* Role Toggle Switcher */}
              <div className={`flex items-center p-1 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'}`}>
                <button
                  onClick={() => setRole('student')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    role === 'student' 
                      ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Student View</span>
                </button>
                <button
                  onClick={() => setRole('admin')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    role === 'admin' 
                      ? 'bg-indigo-600 text-white shadow-sm' 
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Staff / Admin</span>
                </button>
              </div>

              {/* Light/Dark Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2.5 rounded-xl border transition-all ${
                  darkMode ? 'bg-slate-800 text-amber-400 border-slate-700 hover:bg-slate-700' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100 shadow-sm'
                }`}
                title="Toggle Dark Mode"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* New Complaint Button */}
              {role === 'student' && (
                <button
                  onClick={() => setIsNewModalOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Submit Issue</span>
                  <span className="sm:hidden">New</span>
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className={`border-t ${darkMode ? 'border-slate-800/80 bg-slate-900/50' : 'border-slate-200/80 bg-slate-50/50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-3 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap flex items-center space-x-2 transition-colors ${
                activeTab === 'dashboard' 
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold' 
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Dashboard & Feed</span>
            </button>
            <button
              onClick={() => setActiveTab('complaints')}
              className={`py-3 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap flex items-center space-x-2 transition-colors ${
                activeTab === 'complaints' 
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold' 
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>All Complaints ({complaints.length})</span>
            </button>
            {role === 'admin' && (
              <button
                onClick={() => setActiveTab('kanban')}
                className={`py-3 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap flex items-center space-x-2 transition-colors ${
                  activeTab === 'kanban' 
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold' 
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
              >
                <Grid className="w-4 h-4" />
                <span>Kanban Dispatch Board</span>
              </button>
            )}
            {role === 'admin' && (
              <button
                onClick={() => setActiveTab('analytics')}
                className={`py-3 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap flex items-center space-x-2 transition-colors ${
                  activeTab === 'analytics' 
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold' 
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
              >
                <BarChart2 className="w-4 h-4" />
                <span>SLA Analytics</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <aside
        role="note"
        aria-label="Demo data and access notice"
        className={`border-b px-4 py-2.5 text-xs sm:text-sm ${
          darkMode
            ? 'border-amber-900/70 bg-amber-950/40 text-amber-100'
            : 'border-amber-200 bg-amber-50 text-amber-950'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-start gap-2">
          <ShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
          <p className="leading-relaxed">
            <span className="font-bold">Demo only.</span> Complaints stay in this browser and are not shared with other devices. The student/admin switch is not secure authentication.
          </p>
        </div>
      </aside>

      {/* MAIN LAYOUT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* Search & Multi-Filter Header Bar */}
        <div className={`p-4 rounded-2xl border space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="flex flex-col md:flex-row gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search issues, location, description, or CMP-ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none transition ${
                  darkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-500'
                }`}
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute right-3 top-3 text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-3.5 py-2.5 rounded-xl border text-xs font-semibold outline-none cursor-pointer ${
                darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <option value="newest">Sort: Newest First</option>
              <option value="upvotes">Sort: Most Upvoted</option>
              <option value="priority">Sort: Highest Priority</option>
            </select>

            {/* CSV Export for Staff */}
            {role === 'admin' && (
              <button
                onClick={handleExportCSV}
                className="flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition shadow"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            )}
          </div>

          {/* Category, Priority, Status Filter Selectors */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-400 mr-2 flex items-center">
              <Filter className="w-3.5 h-3.5 mr-1" /> Quick Filters:
            </span>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border cursor-pointer ${
                darkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border cursor-pointer ${
                darkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              <option value="All">All Statuses</option>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            {/* Priority Filter */}
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border cursor-pointer ${
                darkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              <option value="All">All Priorities</option>
              {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>

            {(selectedCategory !== 'All' || selectedStatus !== 'All' || selectedPriority !== 'All' || searchTerm) && (
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedStatus('All');
                  setSelectedPriority('All');
                  setSearchTerm('');
                }}
                className="text-xs text-rose-500 hover:underline font-bold ml-auto"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* TAB 1: OVERVIEW DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            
            {/* SLA Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Reported</span>
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <FileText className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3 text-2xl sm:text-3xl font-extrabold">{stats.total}</div>
                <div className="mt-1 text-xs text-slate-500">Across campus units</div>
              </div>

              <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Resolved Ratio</span>
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3 text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">{stats.resolvedRatio}%</div>
                <div className="mt-1 text-xs text-slate-500">{stats.resolved} of {stats.total} closed</div>
              </div>

              <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Avg Resolution</span>
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    <Clock className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3 text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">1.8 Days</div>
                <div className="mt-1 text-xs text-slate-500">Campus SLA target &lt; 2.5d</div>
              </div>

              <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">Urgent Queue</span>
                  <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3 text-2xl sm:text-3xl font-extrabold text-rose-600 dark:text-rose-400">{stats.urgent}</div>
                <div className="mt-1 text-xs text-slate-500">High priority safety issues</div>
              </div>
            </div>

            {/* Trending Feed + Activity Stream */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left 2 Cols: Hot / Upvoted Issues */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Flame className="w-5 h-5 text-amber-500" />
                    <h3 className="text-base font-bold">Top Voted Community Issues</h3>
                  </div>
                  <button 
                    onClick={() => { setSortBy('upvotes'); setActiveTab('complaints'); }}
                    className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center"
                  >
                    View All Feed <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {complaints
                    .slice()
                    .sort((a,b) => b.upvotes - a.upvotes)
                    .slice(0, 3)
                    .map(item => (
                      <div 
                        key={item.id}
                        onClick={() => setSelectedComplaint(item)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all hover:shadow-md ${
                          darkMode ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-indigo-300'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1.5 flex-1">
                            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                              <span className={`text-[10px] px-2.5 py-0.5 rounded-full border ${getPriorityBadge(item.priority)}`}>
                                {item.priority} Priority
                              </span>
                              <span className={`text-[10px] px-2.5 py-0.5 rounded-full border ${getStatusBadge(item.status)}`}>
                                {item.status}
                              </span>
                              <span className="text-xs font-medium text-slate-500 flex items-center">
                                <Tag className="w-3 h-3 mr-1" /> {item.category}
                              </span>
                            </div>
                            <h4 className="font-bold text-sm sm:text-base hover:text-indigo-600 transition-colors">
                              {item.title}
                            </h4>
                            <p className="text-xs text-slate-500 line-clamp-2">
                              {item.description}
                            </p>
                            <div className="flex items-center space-x-4 text-xs text-slate-400 pt-1">
                              <span>📍 {item.location}</span>
                              <span>💬 {item.comments.length} updates</span>
                            </div>
                          </div>

                          {/* Upvote Button */}
                          <button
                            onClick={(e) => handleUpvote(item.id, e)}
                            className={`flex flex-col items-center justify-center min-w-[54px] px-3 py-2 rounded-2xl border transition ${
                              item.upvotedBy?.includes('user-self')
                                ? 'bg-indigo-600 text-white border-indigo-600'
                                : darkMode 
                                  ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700' 
                                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                            }`}
                          >
                            <ThumbsUp className="w-4 h-4" />
                            <span className="text-xs font-bold mt-1">{item.upvotes}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Right Col: Recent Activity Timeline */}
              <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="flex items-center space-x-2 pb-4 border-b border-slate-200 dark:border-slate-800">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <h3 className="font-bold text-sm">Real-time Resolution Activity</h3>
                </div>

                <div className="mt-4 space-y-4 max-h-[360px] overflow-y-auto pr-1">
                  {complaints.flatMap(c => 
                    c.timeline.map(t => ({ ...t, complaintTitle: c.title, complaintId: c.id }))
                  )
                  .slice(0, 6)
                  .map((act, idx) => (
                    <div key={idx} className="flex space-x-3 text-xs">
                      <div className="mt-0.5 min-w-[8px] h-2 rounded-full bg-indigo-500" />
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">{act.step}: <span className="font-normal text-slate-500">{act.note}</span></p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{act.complaintId} • {act.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: ALL COMPLAINTS FEED */}
        {activeTab === 'complaints' && (
          <div className="space-y-4">
            {filteredComplaints.length === 0 ? (
              <div className={`p-12 text-center rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <AlertCircle className="w-12 h-12 mx-auto text-slate-400 mb-3" />
                <h3 className="text-base font-bold">No Complaints Match Filter Criteria</h3>
                <p className="text-xs text-slate-500 mt-1">Try resetting your search query or status filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredComplaints.map(item => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedComplaint(item)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between hover:shadow-lg ${
                      darkMode ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-indigo-300'
                    }`}
                  >
                    <div>
                      {/* Card Header Badges */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono font-bold text-slate-400">{item.id}</span>
                        <div className="flex items-center space-x-2">
                          <span className={`text-[10px] px-2.5 py-0.5 rounded-full border ${getPriorityBadge(item.priority)}`}>
                            {item.priority}
                          </span>
                          <span className={`text-[10px] px-2.5 py-0.5 rounded-full border ${getStatusBadge(item.status)}`}>
                            {item.status}
                          </span>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h3 className="font-bold text-base mb-1 hover:text-indigo-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-3 mb-4">
                        {item.description}
                      </p>

                      {/* Optional Photo Attachment Preview */}
                      {item.attachment && (
                        <div className="mb-4">
                          <img 
                            src={item.attachment} 
                            alt="Attachment preview" 
                            className="h-32 w-full object-cover rounded-xl border border-slate-200 dark:border-slate-800"
                          />
                        </div>
                      )}
                    </div>

                    {/* Metadata Footer */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs text-slate-500">
                      <div className="space-y-0.5">
                        <p className="font-semibold text-slate-700 dark:text-slate-300">📍 {item.location}</p>
                        <p className="text-[11px] text-slate-400">
                          {item.isAnonymous ? '👤 Anonymous' : `👤 ${item.author}`} • {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <button
                        onClick={(e) => handleUpvote(item.id, e)}
                        className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition ${
                          item.upvotedBy?.includes('user-self')
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : darkMode 
                              ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700' 
                              : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{item.upvotes}</span>
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ADMIN KANBAN BOARD */}
        {activeTab === 'kanban' && role === 'admin' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">Admin Dispatch Kanban Board</h3>
                <p className="text-xs text-slate-500">Update status lifecycle and dispatch staff teams</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-x-auto pb-4">
              {STATUSES.map(columnStatus => {
                const colItems = complaints.filter(c => c.status === columnStatus);

                return (
                  <div key={columnStatus} className={`p-4 rounded-2xl border min-w-[280px] flex flex-col ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100/70 border-slate-200'}`}>
                    
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
                      <h4 className="font-bold text-xs uppercase tracking-wider flex items-center space-x-2">
                        <span>{columnStatus}</span>
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {colItems.length}
                      </span>
                    </div>

                    {/* Cards */}
                    <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px] pr-1">
                      {colItems.map(card => (
                        <div
                          key={card.id}
                          onClick={() => setSelectedComplaint(card)}
                          className={`p-4 rounded-xl border cursor-pointer transition shadow-sm hover:shadow-md ${
                            darkMode ? 'bg-slate-800 border-slate-700 hover:border-indigo-500' : 'bg-white border-slate-200 hover:border-indigo-400'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px] mb-2">
                            <span className="font-mono font-bold text-slate-400">{card.id}</span>
                            <span className={`px-2 py-0.5 rounded-full border ${getPriorityBadge(card.priority)}`}>
                              {card.priority}
                            </span>
                          </div>

                          <h5 className="font-bold text-xs line-clamp-2 mb-2 text-slate-900 dark:text-slate-100">
                            {card.title}
                          </h5>

                          <div className="text-[11px] text-slate-500 mb-3 space-y-1">
                            <p className="truncate">📍 {card.location}</p>
                            <p className="truncate font-semibold text-indigo-500">👤 {card.assignedTo}</p>
                          </div>

                          {/* Quick Change dropdown */}
                          <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                            <select
                              value={card.status}
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => handleAdminUpdateStatus(card.id, e.target.value, undefined)}
                              className={`text-[11px] font-bold px-2 py-1 rounded-lg border outline-none ${
                                darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                              }`}
                            >
                              {STATUSES.map(st => <option key={st} value={st}>{st}</option>)}
                            </select>
                            <span className="text-xs font-semibold text-indigo-500 hover:underline">Details &rarr;</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: ADMIN ANALYTICS */}
        {activeTab === 'analytics' && role === 'admin' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Category Breakdown */}
              <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <h3 className="font-bold text-sm mb-4 flex items-center space-x-2">
                  <PieChart className="w-4 h-4 text-indigo-500" />
                  <span>Category Distribution Breakdown</span>
                </h3>
                <div className="space-y-4">
                  {CATEGORIES.map(cat => {
                    const count = stats.catCounts[cat] || 0;
                    const percentage = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;

                    return (
                      <div key={cat} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span>{cat}</span>
                          <span className="text-slate-500">{count} tickets ({percentage}%)</span>
                        </div>
                        <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-indigo-500 to-sky-500 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SLA Metrics */}
              <div className={`p-6 rounded-2xl border space-y-6 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <h3 className="font-bold text-sm flex items-center space-x-2">
                  <BarChart2 className="w-4 h-4 text-emerald-500" />
                  <span>SLA Performance & Ratings</span>
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900">
                    <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">Average Turnaround</span>
                    <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">1.8 Days</div>
                    <span className="text-[10px] text-indigo-500">Target SLA: &lt; 2.5 Days</span>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-900">
                    <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">Satisfaction Score</span>
                    <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center">
                      4.8 <Star className="w-4 h-4 fill-emerald-500 text-emerald-500 ml-1" />
                    </div>
                    <span className="text-[10px] text-emerald-500">Student feedback rating</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Priority Distribution</h4>
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    {PRIORITIES.map(p => {
                      const count = complaints.filter(c => c.priority === p).length;
                      return (
                        <div key={p} className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800">
                          <div className="font-extrabold text-sm">{count}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">{p}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

      </main>

      {/* 2. SUBMIT NEW COMPLAINT MODAL */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`w-full max-w-xl p-6 rounded-3xl border shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'}`}>
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-lg">Submit Campus Complaint</h3>
              </div>
              <button onClick={() => setIsNewModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateComplaint} className="space-y-4">
              
              {/* Title */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Issue Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Water leakage in hostel bathroom 3rd floor"
                  value={newForm.title}
                  onChange={(e) => setNewForm({ ...newForm, title: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-500'
                  }`}
                />
              </div>

              {/* Category & Priority Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Category *</label>
                  <select
                    value={newForm.category}
                    onChange={(e) => setNewForm({ ...newForm, category: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Priority Level *</label>
                  <select
                    value={newForm.priority}
                    onChange={(e) => setNewForm({ ...newForm, priority: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Building & Room / Location *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Hostel Block B, Room 204 or Main Library 3rd Floor"
                  value={newForm.location}
                  onChange={(e) => setNewForm({ ...newForm, location: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-500'
                  }`}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Detailed Description *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe the issue clearly so facilities team can act immediately..."
                  value={newForm.description}
                  onChange={(e) => setNewForm({ ...newForm, description: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-500'
                  }`}
                />
              </div>

              {/* Attachment URL */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Photo Attachment URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newForm.attachmentUrl}
                  onChange={(e) => setNewForm({ ...newForm, attachmentUrl: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-500'
                  }`}
                />
              </div>

              {/* Anonymous Checkbox */}
              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="anonymousToggle"
                  checked={newForm.isAnonymous}
                  onChange={(e) => setNewForm({ ...newForm, isAnonymous: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                />
                <label htmlFor="anonymousToggle" className="text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                  Submit Anonymously (Hide student name from public feed)
                </label>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition"
                >
                  Submit Complaint
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* 3. DETAILS & ACTION MODAL */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`w-full max-w-3xl p-6 rounded-3xl border shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'}`}>
            
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold text-slate-400">{selectedComplaint.id}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getPriorityBadge(selectedComplaint.priority)}`}>
                    {selectedComplaint.priority} Priority
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getStatusBadge(selectedComplaint.status)}`}>
                    {selectedComplaint.status}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold">{selectedComplaint.title}</h2>
              </div>
              <button onClick={() => setSelectedComplaint(null)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Main Content */}
              <div className="md:col-span-2 space-y-5">
                
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Issue Description</h4>
                  <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{selectedComplaint.description}</p>
                </div>

                {selectedComplaint.attachment && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Attached Photograph</h4>
                    <img 
                      src={selectedComplaint.attachment} 
                      alt="Complaint attachment" 
                      className="w-full max-h-56 object-cover rounded-2xl border border-slate-200 dark:border-slate-800"
                    />
                  </div>
                )}

                {/* Timeline */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Resolution Progress Timeline</h4>
                  <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
                    {selectedComplaint.timeline.map((t, idx) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-indigo-600 border-2 border-white dark:border-slate-900" />
                        <div className="text-xs">
                          <span className="font-bold text-slate-900 dark:text-slate-100">{t.step}</span>
                          <span className="text-[10px] text-slate-400 ml-2">{t.time}</span>
                          <p className="text-slate-500 mt-0.5">{t.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rating Feedback Section */}
                {selectedComplaint.status === 'Resolved' && (
                  <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center">
                      <Star className="w-4 h-4 mr-1 fill-emerald-500 text-emerald-500" /> Resolution Feedback & Rating
                    </h4>

                    {selectedComplaint.rating ? (
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1">
                          {[1,2,3,4,5].map(star => (
                            <Star 
                              key={star} 
                              className={`w-4 h-4 ${star <= selectedComplaint.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} 
                            />
                          ))}
                        </div>
                        <p className="text-xs italic text-emerald-900 dark:text-emerald-200">"{selectedComplaint.feedback}"</p>
                      </div>
                    ) : role === 'student' ? (
                      <div className="space-y-3">
                        <p className="text-xs text-slate-600 dark:text-slate-300">How satisfied are you with this resolution?</p>
                        <div className="flex items-center space-x-2">
                          {[1,2,3,4,5].map(star => (
                            <button
                              key={star}
                              onClick={() => setStarRating(star)}
                              className="p-1 hover:scale-110 transition"
                            >
                              <Star className={`w-5 h-5 ${star <= starRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                            </button>
                          ))}
                        </div>
                        <input
                          type="text"
                          placeholder="Leave a short comment on service quality..."
                          value={feedbackComment}
                          onChange={(e) => setFeedbackComment(e.target.value)}
                          className={`w-full px-3 py-1.5 rounded-xl border text-xs ${
                            darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'
                          }`}
                        />
                        <button
                          onClick={() => handleRatingSubmit(selectedComplaint.id)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition"
                        >
                          Submit Review
                        </button>
                      </div>
                    ) : (
                      <p className="text-xs italic text-slate-500">Awaiting student rating feedback.</p>
                    )}
                  </div>
                )}

              </div>

              {/* Sidebar Admin Controls */}
              <div className="space-y-5 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800 md:pl-5 pt-4 md:pt-0">
                
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 block">Category</span>
                    <span className="font-semibold">{selectedComplaint.category}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Location</span>
                    <span className="font-semibold">{selectedComplaint.location}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Reported By</span>
                    <span className="font-semibold">{selectedComplaint.isAnonymous ? 'Anonymous Student' : selectedComplaint.author}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Assigned Staff</span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">{selectedComplaint.assignedTo}</span>
                  </div>
                </div>

                {/* Admin Management Panel */}
                {role === 'admin' && (
                  <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/60 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-300 flex items-center">
                      <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Staff Dispatch Control
                    </h4>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-500 block mb-1">Update Status</label>
                      <select
                        value={selectedComplaint.status}
                        onChange={(e) => handleAdminUpdateStatus(selectedComplaint.id, e.target.value, undefined)}
                        className={`w-full px-2.5 py-1.5 rounded-lg border text-xs font-semibold ${
                          darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'
                        }`}
                      >
                        {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-500 block mb-1">Assign Staff / Team</label>
                      <input
                        type="text"
                        placeholder="e.g. Electrical Dept / John Doe"
                        defaultValue={selectedComplaint.assignedTo}
                        onBlur={(e) => handleAdminUpdateStatus(selectedComplaint.id, undefined, e.target.value)}
                        className={`w-full px-2.5 py-1.5 rounded-lg border text-xs ${
                          darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'
                        }`}
                      />
                    </div>
                  </div>
                )}

                {/* Comments / Staff Notes */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center">
                    <MessageCircle className="w-3.5 h-3.5 mr-1" /> Notes & Discussion ({selectedComplaint.comments.length})
                  </h4>

                  <div className="space-y-2.5 max-h-44 overflow-y-auto pr-1">
                    {selectedComplaint.comments.length === 0 ? (
                      <p className="text-xs italic text-slate-400">No comments added yet.</p>
                    ) : (
                      selectedComplaint.comments.map(c => (
                        <div key={c.id} className={`p-2.5 rounded-xl text-xs space-y-1 ${
                          c.isStaff 
                            ? 'bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900' 
                            : 'bg-slate-100 dark:bg-slate-800'
                        }`}>
                          <div className="flex justify-between font-bold text-[11px]">
                            <span className={c.isStaff ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300'}>
                              {c.author}
                            </span>
                            <span className="text-[10px] text-slate-400">{c.timestamp}</span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-300">{c.text}</p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Add Comment Box */}
                  <div className="pt-2 flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder={role === 'admin' ? "Add staff note..." : "Add comment..."}
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddComment(selectedComplaint.id)}
                      className={`flex-1 px-3 py-1.5 rounded-xl border text-xs outline-none ${
                        darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                    <button
                      onClick={() => handleAddComment(selectedComplaint.id)}
                      className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition shadow"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}