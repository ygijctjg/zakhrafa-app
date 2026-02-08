:root {
    --neon-cyan: #00f2ff;
    --neon-purple: #7000ff;
    --glass: rgba(255, 255, 255, 0.03);
    --glass-border: rgba(255, 255, 255, 0.1);
    --bg-dark: #05050a;
}

* { box-sizing: border-box; -webkit-tap-highlight-color: transparent; outline: none; }

body {
    background: var(--bg-dark);
    background-image: 
        radial-gradient(circle at 10% 20%, rgba(112, 0, 255, 0.15) 0%, transparent 40%),
        radial-gradient(circle at 90% 80%, rgba(0, 242, 255, 0.15) 0%, transparent 40%);
    color: white; font-family: 'Cairo', sans-serif;
    margin: 0; min-height: 100vh; overflow-x: hidden;
}

/* Splash Screen */
#splash-screen {
    position: fixed; inset: 0; background: var(--bg-dark);
    display: flex; flex-direction: column; justify-content: center; align-items: center;
    z-index: 10000; transition: transform 0.8s cubic-bezier(0.87, 0, 0.13, 1);
}
.logo-container img {
    width: 130px; height: 130px; border-radius: 50%;
    border: 2px solid var(--neon-cyan); padding: 5px;
    filter: drop-shadow(0 0 15px var(--neon-cyan));
}
.loader-text { margin-top: 20px; font-size: 0.6rem; letter-spacing: 3px; color: var(--neon-cyan); }

/* App Content */
.app-shell { max-width: 500px; margin: auto; padding: 20px 15px 120px 15px; }
header { text-align: center; margin-bottom: 30px; }
.brand-name { 
    font-size: 2rem; font-weight: 900;
    background: linear-gradient(90deg, var(--neon-cyan), var(--neon-purple));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.subtitle { color: #666; font-size: 0.75rem; margin-top: 5px; }

.glass-card {
    background: var(--glass); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border); border-radius: 24px; padding: 20px;
}
#userInput {
    width: 100%; background: rgba(0,0,0,0.4); border: 1px solid var(--glass-border);
    border-radius: 15px; padding: 15px; color: white; font-size: 1.1rem; text-align: center;
}

/* Grid System - Responsive */
.results-grid {
    display: grid; 
    grid-template-columns: repeat(auto-fill, minmax(145px, 1fr)); 
    gap: 12px;
}
.card-pro {
    background: var(--glass); border: 1px solid var(--glass-border);
    border-radius: 18px; padding: 12px; text-align: center; position: relative;
}
.card-label { font-size: 0.55rem; color: var(--neon-cyan); opacity: 0.6; margin-bottom: 8px; text-transform: uppercase; }
.card-content { font-size: 1.1rem; font-weight: bold; margin-bottom: 12px; word-break: break-all; }

.btn-row { display: flex; gap: 5px; }
.btn-copy { flex: 2; background: white; color: black; border: none; padding: 8px; border-radius: 8px; font-weight: 700; font-size: 0.8rem; cursor: pointer; }
.btn-fav { flex: 1; background: var(--glass); border: 1px solid var(--glass-border); color: white; border-radius: 8px; cursor: pointer; }

/* Bottom Nav */
.nav-bar {
    position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
    width: 85%; max-width: 350px; background: rgba(10, 10, 20, 0.85);
    backdrop-filter: blur(15px); border-radius: 30px; border: 1px solid var(--glass-border);
    display: flex; justify-content: space-around; padding: 12px; z-index: 1000;
}
.nav-item { font-size: 1.2rem; cursor: pointer; }

.section-tag { font-size: 0.7rem; font-weight: bold; margin: 20px 0 10px; border-right: 3px solid; padding-right: 10px; }
.cyan { color: var(--neon-cyan); border-color: var(--neon-cyan); }
.purple { color: var(--neon-purple); border-color: var(--neon-purple); }
.hidden-section { display: none; }

@media (max-width: 350px) { .results-grid { grid-template-columns: 1fr; } }
