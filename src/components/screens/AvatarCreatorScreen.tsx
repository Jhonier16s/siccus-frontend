import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '.././ui/button';
import {
  AvatarCreator,
  AvatarCreatorConfig,
  AvatarExportedEvent,
  UserAuthorizedEvent,
  UserSetEvent,
  AssetUnlockedEvent,
} from '@readyplayerme/react-avatar-creator';
import { getUser, updateUser } from '../../services/userService';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'sonner@2.0.3';

interface AvatarCreatorScreenProps {
  onBack: () => void;
  userId?: number; // optional for now; default to 1 if not provided
}

export function AvatarCreatorScreen({ onBack, userId = 1 }: AvatarCreatorScreenProps) {
  const authUser = useAuthStore(s => s.user);
  const effectiveUserId = (authUser?.id_usuario as number) || (authUser?.id as number) || userId;
  const setAuth = useAuthStore(s => s.setAuth);
  const config: AvatarCreatorConfig = {
    clearCache: true,
    bodyType: 'fullbody',
    quickStart: false,
    language: 'en',
  };

  const handleOnUserSet = (event: UserSetEvent) => {
    console.log(`User ID is: ${event.data.id}`);
  };

  const handleOnAvatarExported = async (event: AvatarExportedEvent) => {
    const url = event.data.url;
    console.log(`Avatar URL is: ${url}`);
    try {
      await updateUser(effectiveUserId, { avatarUrl: url });
      // Refetch user to update global state
      const refreshed = await getUser(effectiveUserId);
      const refreshedUser: any = (refreshed as any).user ?? refreshed;
      const currentToken = useAuthStore.getState().token || '';
      // Update global auth state with the newest user data
      setAuth({ token: currentToken, user: refreshedUser });
      toast.success('Avatar actualizado correctamente');
      onBack();
    } catch (e: any) {
      console.error('Error guardando avatarUrl:', e?.message || e);
      toast.error(e?.message || 'No se pudo actualizar el avatar');
      // Stay on the screen; you might show a toast here
    }
  };

  const handleUserAuthorized = (event: UserAuthorizedEvent) => {
    console.log('User is:', event.data);
  };

  const handleAssetUnlocked = (event: AssetUnlockedEvent) => {
    console.log(`Asset unlocked is: ${event.data.assetId}`);
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-background z-[1000]">
      <div className="absolute top-4 left-4 z-[1001]">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Volver
        </Button>
      </div>
      <AvatarCreator
        subdomain="siccus"
        config={config}
        style={{ width: '100%', height: '100vh', border: 'none', margin: 0 }}
        onAvatarExported={handleOnAvatarExported}
        onUserAuthorized={handleUserAuthorized}
        onAssetUnlock={handleAssetUnlocked}
        onUserSet={handleOnUserSet}
      />
    </div>
  );
}
