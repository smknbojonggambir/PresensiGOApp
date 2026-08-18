export type ActiveTab = 'visual_assets' | 'simulator' | 'native_code' | 'guide';

export type VisualScreenTab = 'playstore_icon' | 'home_screen' | 'splash_screen' | 'logo_concept';

export type AdaptiveShape = 'squircle' | 'circle' | 'rounded' | 'teardrop';

export interface CodeFile {
  id: string;
  name: string;
  path: string;
  language: string;
  category: 'manifest' | 'java' | 'layout' | 'res' | 'gradle' | 'ci_cd';
  description: string;
  content: string;
}

export interface AttendanceRecord {
  id: string;
  timestamp: string;
  type: 'masuk' | 'pulang' | 'izin';
  userName: string;
  userRole: string;
  userNIP: string;
  latitude: number;
  longitude: number;
  distanceMeter: number;
  inSchoolRadius: boolean;
  photoUrl: string | null;
  audioVerified: boolean;
  status: 'valid' | 'warning' | 'rejected';
}

export interface PermissionState {
  camera: 'granted' | 'denied' | 'prompt';
  location: 'granted' | 'denied' | 'prompt';
  audio: 'granted' | 'denied' | 'prompt';
}
