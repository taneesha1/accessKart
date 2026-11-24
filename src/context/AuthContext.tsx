import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../lib/firebase';

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  updateAccountName: (name: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function ensureFirebaseConfigured() {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase is not configured. Add your VITE_FIREBASE_* values to the project .env file and restart the dev server.');
  }
}

export function getAuthErrorMessage(error: unknown): string {
  const code = typeof error === 'object' && error !== null && 'code' in error
    ? String((error as { code: unknown }).code)
    : '';

  const messages: Record<string, string> = {
    'auth/email-already-in-use': 'An account already exists with this email address. Try signing in.',
    'auth/invalid-email': 'Enter a valid email address.',
    'auth/invalid-credential': 'The email or password is incorrect.',
    'auth/user-disabled': 'This account has been disabled. Contact support.',
    'auth/weak-password': 'Choose a stronger password with at least 6 characters.',
    'auth/popup-closed-by-user': 'The Google sign-in window was closed before completion.',
    'auth/popup-blocked': 'Your browser blocked the sign-in popup. Allow popups and try again.',
    'auth/account-exists-with-different-credential': 'An account already exists with this email using another sign-in method.',
    'auth/network-request-failed': 'Network error. Check your connection and try again.',
    'auth/too-many-requests': 'Too many attempts. Wait a little and try again.',
    'auth/operation-not-allowed': 'This sign-in method is not enabled in Firebase Console.',
  };

  if (messages[code]) return messages[code];
  return error instanceof Error ? error.message : 'Authentication failed. Please try again.';
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      return;
    }
    return onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setLoading(false);
    });
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    ensureFirebaseConfigured();
    const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
    setUser(credential.user);
  }, []);

  const signUp = useCallback(async (name: string, email: string, password: string) => {
    ensureFirebaseConfigured();
    const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
    await updateProfile(credential.user, { displayName: name.trim() });
    await credential.user.reload();
    setUser(auth.currentUser);
  }, []);

  const signInWithGoogle = useCallback(async () => {
    ensureFirebaseConfigured();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const credential = await signInWithPopup(auth, provider);
    setUser(credential.user);
  }, []);

  const signOutUser = useCallback(async () => {
    ensureFirebaseConfigured();
    await signOut(auth);
    setUser(null);
  }, []);

  const updateAccountName = useCallback(async (name: string) => {
    ensureFirebaseConfigured();
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error('You must be signed in to update your profile.');
    await updateProfile(currentUser, { displayName: name.trim() });
    await currentUser.reload();
    setUser(auth.currentUser);
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    ensureFirebaseConfigured();
    await sendPasswordResetEmail(auth, email.trim());
  }, []);

  const value = useMemo(() => ({ user, loading, signIn, signUp, signInWithGoogle, signOutUser, updateAccountName, resetPassword }), [user, loading, signIn, signUp, signInWithGoogle, signOutUser, updateAccountName, resetPassword]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside AuthProvider');
  return value;
}
