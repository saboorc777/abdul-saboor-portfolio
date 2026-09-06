import { useEffect, useState } from 'react';
import { profileApi, resolveAssetUrl } from '../../services/api';

export default function ProfileManager() {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [notice, setNotice] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await profileApi.get();
      setPhotoUrl(data.photoUrl);
    } catch {
      setNotice('Could not load profile photo. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('photo', file);
    setUploading(true);
    setNotice('');
    try {
      const { data } = await profileApi.uploadPhoto(formData);
      setPhotoUrl(data.photoUrl);
      setNotice('Profile photo updated — it\u2019s now live on the About section.');
    } catch {
      setNotice('Upload failed. Make sure the file is an image under 5MB.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-projects">
      <h2>Profile Photo</h2>
      {notice && <p className="admin-notice">{notice}</p>}

      <div className="card admin-form">
        <h3>About Section Photo</h3>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="admin-profile-preview">
              {photoUrl ? (
                <img src={resolveAssetUrl(photoUrl)} alt="Current profile" />
              ) : (
                <span>No photo uploaded yet — the About section shows your initials instead.</span>
              )}
            </div>

            <div className="field">
              <label>{photoUrl ? 'Replace photo' : 'Upload photo'}</label>
              <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} />
              {uploading && <span className="admin-form__hint">Uploading...</span>}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
