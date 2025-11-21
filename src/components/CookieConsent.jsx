import { useState, useEffect } from "react";

const COOKIE_KEY = "cookie_preferences";

const defaultPreferences = {
   necessary: true,
   analytics: false,
   marketing: false,
};

const ToggleSwitch = ({ checked, onChange }) => {
   return (
      <button
         type="button"
         onClick={onChange}
         style={{
            ...styles.switchTrack,
            backgroundColor: checked ? "#0d6efd" : "#c5c5c5",
         }}
      >
         <span
            style={{
               ...styles.switchThumb,
               transform: checked ? "translateX(22px)" : "translateX(0)",
            }}
         />
      </button>
   );
};

const CookieConsent = () => {
   const [prefs, setPrefs] = useState(defaultPreferences);
   const [shouldRenderBanner, setShouldRenderBanner] = useState(false);
   const [bannerOpen, setBannerOpen] = useState(false); 
   const [showSettings, setShowSettings] = useState(false);
   const [hasConsent, setHasConsent] = useState(false);

   useEffect(() => {
      const saved = localStorage.getItem(COOKIE_KEY);

      if (saved) {
         try {
            const parsed = JSON.parse(saved);
            setPrefs({ ...defaultPreferences, ...parsed });
            setHasConsent(true);
         } catch (e) {
            console.error("Invalid cookie prefs, resetting…", e);
            setHasConsent(false);
            setShouldRenderBanner(true);
            setTimeout(() => setBannerOpen(true), 50);
         }
      } else {
         setHasConsent(false);
         setShouldRenderBanner(true);
         setTimeout(() => setBannerOpen(true), 50);
      }
   }, []);

   const savePreferences = (data) => {
      localStorage.setItem(COOKIE_KEY, JSON.stringify(data));

      document.cookie = `cookie_preferences=${encodeURIComponent(
         JSON.stringify(data)
      )}; path=/; max-age=31536000; SameSite=Lax`;

      setPrefs(data);
      setHasConsent(true);
   };

   const acceptAll = () => {
      const updated = { necessary: true, analytics: true, marketing: true };
      savePreferences(updated);
      closeBanner();
   };

   const rejectNonEssential = () => {
      const updated = { necessary: true, analytics: false, marketing: false };
      savePreferences(updated);
      closeBanner();
   };

   const saveSettings = () => {
      savePreferences(prefs);
      closeBanner();
   };

   const closeBanner = () => {
      setBannerOpen(false);
      setTimeout(() => {
         setShouldRenderBanner(false);
         setShowSettings(false);
      }, 500); 
   };

   const openSettings = () => {
      setShowSettings(true);
      if (!shouldRenderBanner) {
         setShouldRenderBanner(true);
         setTimeout(() => setBannerOpen(true), 30);
      }
   };

   const togglePref = (key) => {
      if (key === "necessary") return; 
      setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
   };

   const showBanner = shouldRenderBanner;

   return (
      <>
         {showBanner && showSettings && (
            <div style={styles.dimOverlay} onClick={closeBanner} />
         )}

         {hasConsent && !showBanner && (
            <button style={styles.fabButton} onClick={openSettings}>
               Cookie Settings
            </button>
         )}

         {showBanner && (
            <div
               style={{
                  ...styles.banner,
                  transform: bannerOpen
                     ? "translate(-50%, 0px)"
                     : "translate(-50%, -200px)",
                  opacity: bannerOpen ? 1 : 0,
               }}
            >
               {!showSettings && (
                  <>
                     <h2 style={styles.heading}>You&apos;re in control of cookies</h2>
                     <p style={styles.text}>
                        We use cookies to enhance your experience, analyse traffic, and
                        deliver relevant content. You can accept all cookies, reject
                        non-essential cookies, or manage your preferences.
                     </p>

                     <div style={styles.buttonRow}>
                        <button style={styles.rejectBtn} onClick={rejectNonEssential}>
                           Reject non-essential
                        </button>
                        <button style={styles.acceptBtn} onClick={acceptAll}>
                           Accept all cookies
                        </button>
                     </div>

                     <button style={styles.settingsLink} onClick={openSettings}>
                        Cookie settings
                     </button>
                  </>
               )}

               {showSettings && (
                  <>
                     <h2 style={styles.heading}>Cookie settings</h2>
                     <p style={styles.textSmall}>
                        Manage how we use cookies on this site. Essential cookies are
                        required for the website to function and cannot be disabled.
                     </p>

                     <div style={styles.categoryBox}>
                        <div>
                           <h4 style={styles.catTitle}>Essential cookies</h4>
                           <p style={styles.catDesc}>
                              Required for core site functionality like security, network
                              management and accessibility.
                           </p>
                        </div>
                        <span style={styles.badge}>Always on</span>
                     </div>

                     <div style={styles.categoryBox}>
                        <div>
                           <h4 style={styles.catTitle}>Analytics cookies</h4>
                           <p style={styles.catDesc}>
                              Help us understand how visitors use the site so we can
                              improve performance and content.
                           </p>
                        </div>
                        <ToggleSwitch
                           checked={prefs.analytics}
                           onChange={() => togglePref("analytics")}
                        />
                     </div>

                     <div style={styles.categoryBox}>
                        <div>
                           <h4 style={styles.catTitle}>Marketing & personalised ads</h4>
                           <p style={styles.catDesc}>
                              Used to show you personalised content and advertising based
                              on your interests on this and other sites.
                           </p>
                        </div>
                        <ToggleSwitch
                           checked={prefs.marketing}
                           onChange={() => togglePref("marketing")}
                        />
                     </div>

                     <div style={styles.buttonRow}>
                        <button style={styles.rejectBtn} onClick={rejectNonEssential}>
                           Reject non-essential
                        </button>
                        <button style={styles.acceptBtn} onClick={saveSettings}>
                           Save my choices
                        </button>
                     </div>
                  </>
               )}
            </div>
         )}
      </>
   );
};

const styles = {
   banner: {
      position: "fixed",
      top: "50px", 
      left: "50%",
      transform: "translate(-50%, -200px)", 
      width: "95%",
      maxWidth: "900px",
      padding: "22px 20px 18px",
      borderRadius: "18px",
      background: "rgba(255, 255, 255, 0.82)",
      backdropFilter: "blur(18px)",
      WebkitBackdropFilter: "blur(18px)",
      border: "1px solid rgba(255, 255, 255, 0.6)",
      boxShadow: "0 18px 45px rgba(0, 0, 0, 0.35)",
      zIndex: 999999,
      transition:
         "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.7s ease",
      opacity: 0,
      color: "#111",
      boxSizing: "border-box",
   },

   dimOverlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.35)",
      zIndex: 999998,
   },

   heading: {
      fontSize: "22px",
      fontWeight: 700,
      marginBottom: "8px",
   },

   text: {
      fontSize: "14px",
      color: "#333",
      marginBottom: "16px",
      lineHeight: 1.5,
   },

   textSmall: {
      fontSize: "13px",
      color: "#444",
      marginBottom: "14px",
      lineHeight: 1.5,
   },

   buttonRow: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      marginTop: "8px",
      marginBottom: "8px",
   },

   acceptBtn: {
      flex: "1 1 160px",
      background: "#0d6efd",
      color: "#fff",
      padding: "12px",
      borderRadius: "999px",
      border: "none",
      fontWeight: 600,
      cursor: "pointer",
      fontSize: "14px",
      textAlign: "center",
      minWidth: "140px",
   },

   rejectBtn: {
      flex: "1 1 160px",
      background: "rgba(13,110,253,0.05)",
      color: "#0d6efd",
      padding: "12px",
      borderRadius: "999px",
      border: "1px solid #0d6efd",
      fontWeight: 600,
      cursor: "pointer",
      fontSize: "14px",
      textAlign: "center",
      minWidth: "140px",
   },

   settingsLink: {
      marginTop: "4px",
      fontSize: "13px",
      background: "none",
      border: "none",
      color: "#444",
      textDecoration: "underline",
      cursor: "pointer",
   },

   categoryBox: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: "10px",
      alignItems: "center",
      padding: "10px 0",
      borderTop: "1px solid rgba(0,0,0,0.06)",
      marginTop: "4px",
   },

   catTitle: {
      fontSize: "15px",
      fontWeight: 600,
      marginBottom: "4px",
   },

   catDesc: {
      fontSize: "13px",
      color: "#555",
      maxWidth: "600px",
      lineHeight: 1.4,
   },

   badge: {
      background: "rgba(0,0,0,0.05)",
      padding: "5px 10px",
      borderRadius: "999px",
      fontSize: "12px",
      whiteSpace: "nowrap",
   },

   // glassy toggle switch
   switchTrack: {
      position: "relative",
      width: "46px",
      height: "24px",
      borderRadius: "999px",
      border: "none",
      padding: 0,
      display: "inline-flex",
      alignItems: "center",
      cursor: "pointer",
      transition: "background-color 0.25s ease",
   },

   switchThumb: {
      position: "absolute",
      left: "2px",
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      background: "#fff",
      boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
      transition: "transform 0.25s ease",
   },

   fabButton: {
      position: "fixed",
      bottom: "18px",
      right: "18px",
      padding: "9px 14px",
      borderRadius: "999px",
      border: "none",
      background: "rgba(15, 23, 42, 0.96)",
      color: "#fff",
      fontSize: "12px",
      fontWeight: 500,
      cursor: "pointer",
      zIndex: 999997,
      boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
   },
};

export default CookieConsent;
