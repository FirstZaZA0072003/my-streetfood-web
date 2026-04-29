import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import './App.css';

// 1. URL หลักจากหน้า Dashboard ของคุณ (ห้ามเปลี่ยน)
const R2_PUBLIC_URL = "https://pub-c61e320319444d919b72469b9bd52b24.r2.dev/images";

const FOOD_COLLECTIONS = [
  { 
    id: 1, 
    youtubeId: 'Cc1EuoR4o-o', 
    displayName: 'Thai Basil Stir-Fry', 
    subName: '(Pad Ka-Prao)', 
    imgUrl: `${R2_PUBLIC_URL}/food1_plate.jpg`, 
    detailImgUrl: `${R2_PUBLIC_URL}/food1_hd.jpg`, 
    extraImages: [`${R2_PUBLIC_URL}/f1_1.jpg`, `${R2_PUBLIC_URL}/f1_2.jpg`, `${R2_PUBLIC_URL}/f1_3.jpg`], 
    address: "13°37'35.1\"N 100°30'22.7\"E", 
    story: "Known as the Holy Grail of Thai street food. Its soul lies in the Holy Basil.", 
    ingredients: ["Minced Pork", "Holy Basil", "Thai Chilies", "Garlic", "Fish Sauce"] 
  },
  { 
    id: 2, 
    youtubeId: 'TNlRSDDPxz8', 
    displayName: 'Thai Stir-Fried Noodles', 
    subName: '(Pad Thai)', 
    imgUrl: `${R2_PUBLIC_URL}/food2_plate.jpg`, 
    detailImgUrl: `${R2_PUBLIC_URL}/food2_hd.jpg`, 
    extraImages: [`${R2_PUBLIC_URL}/f2_1.jpg`, `${R2_PUBLIC_URL}/f2_2.jpg`, `${R2_PUBLIC_URL}/f2_3.jpg`], 
    address: "13°38'41.3\"N 100°29'56.1\"E", 
    story: "A masterpiece of Thai culinary nationalism.", 
    ingredients: ["Rice Noodles", "Shrimp", "Tofu", "Bean Sprout", "Peanuts"] 
  },
  { 
    id: 3, 
    youtubeId: 'YykxMSNfuZw', 
    displayName: 'Green Papaya Salad', 
    subName: '(Som Tam)', 
    imgUrl: `${R2_PUBLIC_URL}/food3_plate.jpg`, 
    detailImgUrl: `${R2_PUBLIC_URL}/food3_hd.jpg`, 
    extraImages: [`${R2_PUBLIC_URL}/f3_1.jpg`, `${R2_PUBLIC_URL}/f3_2.jpg`, `${R2_PUBLIC_URL}/f3_3.jpg`], 
    address: "13°37'35.5\"N 100°30'23.1\"E", 
    story: "A masterpiece of Isan texture.", 
    ingredients: ["Papaya", "Green Beans", "Peanuts", "Lime", "Chili"] 
  },
  { 
    id: 4, 
    youtubeId: 'Spk5D0M1Bgk', 
    displayName: 'Mango Sticky Rice', 
    subName: '(Khao Niao Mamuang)', 
    imgUrl: `${R2_PUBLIC_URL}/food4_plate.jpg`, 
    detailImgUrl: `${R2_PUBLIC_URL}/food4_hd.jpg`, 
    extraImages: [`${R2_PUBLIC_URL}/f4_1.jpg`, `${R2_PUBLIC_URL}/f4_2.jpg`, `${R2_PUBLIC_URL}/f4_3.jpg`], 
    address: "13°38'39.7\"N 100°29'56.4\"E", 
    story: "Represents the peak of Thai hospitality.", 
    ingredients: ["Mango", "Glutinous Rice", "Coconut Milk", "Sugar"] 
  },
  { 
    id: 5, 
    youtubeId: 'CwRfyTogG74', 
    displayName: 'Thai Grilled Pork', 
    subName: '(Moo Ping)', 
    imgUrl: `${R2_PUBLIC_URL}/food6_plate.jpg`, 
    detailImgUrl: `${R2_PUBLIC_URL}/food6_hd.jpg`, 
    extraImages: [`${R2_PUBLIC_URL}/f6_1.jpg`, `${R2_PUBLIC_URL}/f6_2.jpg`, `${R2_PUBLIC_URL}/f6_3.jpg`], 
    address: "13°38'40.8\"N 100°29'59.8\"E", 
    story: "Bold sauce marinated to perfection.", 
    ingredients: ["Pork", "Garlic", "Coriander Root", "Coconut Milk"] 
  },
  { 
    id: 6, 
    youtubeId: 'GVG9jtneojg', 
    displayName: 'Thai Grilled Chicken', 
    subName: '(Gai Yang)', 
    imgUrl: `${R2_PUBLIC_URL}/food7_plate.jpg`, 
    detailImgUrl: `${R2_PUBLIC_URL}/food7_hd.jpg`, 
    extraImages: [`${R2_PUBLIC_URL}/f7_1.jpg`, `${R2_PUBLIC_URL}/f7_2.jpg`, `${R2_PUBLIC_URL}/f7_3.jpg`], 
    address: "13°38'40.9\"N 100°29'59.5\"E", 
    story: "Savory, smoky, and tender grilled chicken.", 
    ingredients: ["Chicken", "Lemongrass", "Garlic", "Turmeric"] 
  },
  { 
    id: 7, 
    youtubeId: 'YBO5ZTY5KL4', 
    displayName: 'Thai Sweet Roti', 
    subName: '(Ro-Tee)', 
    imgUrl: `${R2_PUBLIC_URL}/food8_plate.jpg`, 
    detailImgUrl: `${R2_PUBLIC_URL}/food8_hd.jpg`, 
    extraImages: [`${R2_PUBLIC_URL}/f8_1.jpg`, `${R2_PUBLIC_URL}/f8_2.jpg`, `${R2_PUBLIC_URL}/f8_3.jpg`], 
    address: "Market 61, Bangkok", 
    story: "An ancient dessert using local rice flour.", 
    ingredients: ["Flour", "Butter", "Egg", "Condensed Milk"] 
  },
  { 
    id: 8, 
    youtubeId: 'L-pc-DzPf-M', 
    displayName: 'Soy Sauce Noodles', 
    subName: '(Pad See-Ew)', 
    imgUrl: `${R2_PUBLIC_URL}/food9_plate.jpg`, 
    detailImgUrl: `${R2_PUBLIC_URL}/food9_hd.jpg`, 
    extraImages: [`${R2_PUBLIC_URL}/f9_1.jpg`, `${R2_PUBLIC_URL}/f9_2.jpg`, `${R2_PUBLIC_URL}/f9_3.jpg`], 
    address: "13°37'35.1\"N 100°30'22.7\"E", 
    story: "A smoky, wok-fired masterpiece.", 
    ingredients: ["Wide Noodles", "Broccoli", "Pork", "Egg", "Soy Sauce"] 
  },
  { 
    id: 9, 
    youtubeId: 'AwaMJR2j88w', 
    displayName: 'Thai Street Meatballs', 
    subName: '(Look-Chin)', 
    imgUrl: `${R2_PUBLIC_URL}/food10_plate.jpg`, 
    detailImgUrl: `${R2_PUBLIC_URL}/food10_hd.jpg`, 
    extraImages: [`${R2_PUBLIC_URL}/f10_1.jpg`, `${R2_PUBLIC_URL}/f10_2.jpg`, `${R2_PUBLIC_URL}/f10_3.jpg`], 
    address: "13°37'34.7\"N 100°30'24.6\"E", 
    story: "The ultimate 'on-the-go' Thai snack.", 
    ingredients: ["Meatballs", "Tamarind Paste", "Chili", "Garlic"] 
  }
];

export default function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [activeTab, setActiveTab] = useState('story');
  const [heroMouse, setHeroMouse] = useState({ x: 0, y: 0 });

  const canvasRef = useRef(null);
  const tableGroupRef = useRef(null);
  const stateRef = useRef({ index: -1, isAnimating: false });
  const mouse = useRef({ x: 0, y: 0 });

  const isMobile = useMemo(() => window.innerWidth <= 768, []);
  const SPACING = useMemo(() => (isMobile ? 1500 : 2800), [isMobile]);

  const moveToIndex = useCallback((nextIndex) => {
    if (stateRef.current.isAnimating || !tableGroupRef.current) return;
    const gsap = window.gsap;
    stateRef.current.isAnimating = true;
    stateRef.current.index = nextIndex;
    setCurrentIndex(nextIndex);

    gsap.to(tableGroupRef.current.position, {
      x: -(nextIndex * SPACING),
      duration: 1.0,
      ease: "power2.inOut",
      onComplete: () => { stateRef.current.isAnimating = false; }
    });
    gsap.to(tableGroupRef.current.rotation, { x: 0, y: 0, duration: 0.8 });
  }, [SPACING]);

  const goBackHome = useCallback(() => {
    if (stateRef.current.isAnimating || !tableGroupRef.current) return;
    const gsap = window.gsap;
    stateRef.current.isAnimating = true;

    gsap.to(tableGroupRef.current.position, {
      y: -2500,
      duration: 1.2,
      ease: "power4.inOut",
      onComplete: () => {
        stateRef.current.index = -1;
        setIsStarted(false);
        setCurrentIndex(0);
        stateRef.current.isAnimating = false;
      }
    });
    gsap.to(tableGroupRef.current.rotation, { x: 0, y: 0, duration: 0.8 });
  }, []);

  const startJourney = useCallback((targetIndex = 0) => {
    if (!tableGroupRef.current || stateRef.current.isAnimating) return;
    const gsap = window.gsap;
    stateRef.current.isAnimating = true;

    setIsStarted(true);
    stateRef.current.index = targetIndex;
    setCurrentIndex(targetIndex);

    gsap.to(tableGroupRef.current.position, {
      x: -(targetIndex * SPACING),
      y: isMobile ? -180 : -220,
      duration: 1.5,
      ease: "expo.out",
      onComplete: () => { stateRef.current.isAnimating = false; }
    });
  }, [SPACING, isMobile]);

  const handleHeroMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    setHeroMouse({ x, y });
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  };

  useEffect(() => {
    const scripts = [
      'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/Observer.min.js'
    ];

    const loadScript = (src) => {
      return new Promise((resolve) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve();
        const s = document.createElement('script');
        s.src = src; s.async = false;
        s.onload = resolve;
        document.head.appendChild(s);
      });
    };

    Promise.all(scripts.map(loadScript)).then(() => {
      if (!window.THREE || !window.gsap) return;
      initThree();
    });

    function initThree() {
      const THREE = window.THREE;
      const gsap = window.gsap;
      const { Observer } = window;
      gsap.registerPlugin(Observer);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(isMobile ? 45 : 35, window.innerWidth / window.innerHeight, 10, 10000);
      camera.position.set(0, 650, 2100);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

      if (canvasRef.current) {
        canvasRef.current.innerHTML = '';
        canvasRef.current.appendChild(renderer.domElement);
      }

      scene.add(new THREE.AmbientLight(0xffffff, 0.8));
      const mainLight = new THREE.DirectionalLight(0xfff5e6, 1.2);
      mainLight.position.set(0, 1500, 800);
      scene.add(mainLight);

      const tableGroup = new THREE.Group();
      tableGroup.position.y = stateRef.current.index === -1 ? -2500 : (isMobile ? -180 : -220);
      tableGroup.position.x = stateRef.current.index === -1 ? 0 : -(stateRef.current.index * SPACING);
      scene.add(tableGroup);
      tableGroupRef.current = tableGroup;

      FOOD_COLLECTIONS.forEach((menu, i) => {
        const group = new THREE.Group();
        group.position.x = i * SPACING;
        tableGroup.add(group);
      });

      const animate = () => {
        if (stateRef.current.index !== -1 && tableGroupRef.current) {
          if (!stateRef.current.isAnimating) {
            tableGroup.rotation.x += (mouse.current.y * 0.04 - tableGroup.rotation.x) * 0.05;
            tableGroup.rotation.y += (mouse.current.x * 0.04 - tableGroup.rotation.y) * 0.05;
          }
          camera.lookAt(0, 100, 0);
        }
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };
      animate();

      const goToStep = (nextIndex, direction) => {
        if (stateRef.current.isAnimating || selectedMenu) return;
        if (stateRef.current.index === 0 && direction === "up") {
          goBackHome();
        } else if (stateRef.current.index === -1 && direction === "down") {
          startJourney(0);
        } else if (nextIndex >= 0 && nextIndex < FOOD_COLLECTIONS.length) {
          moveToIndex(nextIndex);
        }
      };

      Observer.create({
        target: window,
        type: "wheel,touch,pointer",
        onDown: () => goToStep(stateRef.current.index + 1, "down"),
        onUp: () => goToStep(stateRef.current.index - 1, "up"),
        tolerance: isMobile ? 15 : 30,
        preventDefault: true
      });

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    }
  }, [SPACING, moveToIndex, startJourney, goBackHome, selectedMenu, isMobile]);

  return (
    <div className="app-container" onMouseMove={handleHeroMouseMove}>

      {/* 1. Landing Screen */}
      <div className={`landing-screen ${isStarted ? 'started' : ''}`}>
        <div className="hero-bg-glow"></div>
        <div className="pl-parallax-container">
          {FOOD_COLLECTIONS.slice(0, 9).map((plate, idx) => (
            <div key={idx}
              className="pl-floating-plate-unit"
              onClick={() => startJourney(idx)}
              style={!isMobile ? {
                top: ['8%', '15%', '75%', '85%', '35%', '5%', '55%', '85%', '45%'][idx],
                left: ['5%', '75%', '5%', '85%', '88%', '32%', '2%', '20%', '80%'][idx],
                transform: `translate3d(${heroMouse.x * (idx + 10)}px, ${heroMouse.y * (idx + 10)}px, 0)`,
                zIndex: 5,
                cursor: 'pointer'
              } : {}}
            >
              {/* ดึง imgUrl จาก R2 ทันที */}
              <div className="pl-ceramic-plate-v3" style={{ backgroundImage: `url(${plate.imgUrl})` }}>
                <div className="click-hint">VIEW</div>
              </div>
              <div className="plate-name-label">{plate.displayName}</div>
            </div>
          ))}
        </div>

        <div className="hero-box-v2">
          <div className="hero-header-meta">ESTABLISHED 2026</div>
          <h1 className="hero-title-v2">
            <span className="v2-title-top">THE ART OF</span>
            <span className="v2-title-mid">STREET FOOD</span>
            <span className="v2-title-bot">THAI</span>
          </h1>
          <p className="hero-tag-v2">A Curated Culinary Journey Through Thailand’s Soul</p>
          <div className="cta-container">
            <span className="scroll-text-v2-btn" onClick={() => startJourney(0)} style={{ cursor: 'pointer' }}>
              [ CLICK TO START JOURNEY ]
            </span>
          </div>
        </div>

        <div className="scroll-hint-v2">
          <div className="mouse-icon"><div className="wheel"></div></div>
          <span className="scroll-hint-text">SCROLL TO EXPLORE</span>
        </div>
      </div>

      {/* 2. Experience View */}
      <div className={`experience-view ${isStarted ? 'visible' : ''}`}>
        <div className="canvas-container" ref={canvasRef} />

        {isStarted && (
          <div className="main-ui-overlay-v2">
            <div className="ui-top-meta">
              <div className="meta-left">
                <span>TRADITIONAL HERITAGE — 2026</span>
                {isMobile && <span className="mobile-count">COLLECTION {currentIndex + 1}/9</span>}
              </div>

              {!isMobile && (
                <button className="v2-home-btn" onClick={(e) => { e.stopPropagation(); goBackHome(); }}>
                  [ BACK TO HOME ]
                </button>
              )}
            </div>

            <div className="ui-mid-content">
              {/* ดึงรูป PNG จาก R2 ตามชื่อไฟล์ 1.png, 2.png... */}
              {FOOD_COLLECTIONS[currentIndex]?.id && (
                <div className="dish-plate-wrapper">
                  <img
                    src={`${R2_PUBLIC_URL}/${FOOD_COLLECTIONS[currentIndex].id}.png`}
                    alt="Dish"
                    className="dish-plate-img"
                  />
                </div>
              )}

              <div className="dish-info-main">
                <span className="collection-count">COLLECTION {currentIndex + 1}/9</span>
                <h2 className="v2-dish-name">{FOOD_COLLECTIONS[currentIndex]?.displayName}</h2>
                <p className="v2-dish-sub">{FOOD_COLLECTIONS[currentIndex]?.subName}</p>
                <div className="v2-separator"></div>
              </div>
            </div>

            <div className="ui-bottom-bar">
              <div className="bottom-controls-group">
                <button
                  className="v2-explore-btn"
                  onClick={() => { setSelectedMenu(FOOD_COLLECTIONS[currentIndex]); setActiveTab('story'); }}
                >
                  VIEW DETAILS & STORY — [ OPEN ]
                </button>

                {isMobile && (
                  <button
                    className="v2-home-btn-bottom"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      goBackHome();
                    }}
                  >
                    [ BACK TO HOME ]
                  </button>
                )}

                <div className="pagination-stack">
                  <div className="dish-pagination-v3">
                    {FOOD_COLLECTIONS.map((_, idx) => (
                      <div
                        key={idx}
                        className={`page-item-v3 ${currentIndex === idx ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          moveToIndex(idx);
                        }}
                      >
                        <span className="page-number-v3">
                          {(idx + 1).toString().padStart(2, '0')}
                        </span>
                      </div>
                    ))}
                  </div>

                  {!selectedMenu && (
                    <div className="experience-scroll-hint-under">
                      <span className="exp-hint-text-small">SCROLL TO CHANGE DISH</span>
                      <div className="exp-mouse-icon-small"><div className="exp-wheel-small"></div></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Modal Detail */}
      {selectedMenu && (
        <div className="modal-overlay" onClick={() => setSelectedMenu(null)}>
          <div className="modal-content-premium" onClick={e => e.stopPropagation()}>
            <div className="modal-header-new">
              <div className="header-meta">BANGKOK / THAILAND</div>
              <div className="modal-tabs">
                <button className={`tab-btn ${activeTab === 'story' ? 'active' : ''}`} onClick={() => setActiveTab('story')}>STORY</button>
                <button className={`tab-btn ${activeTab === 'gallery' ? 'active' : ''}`} onClick={() => setActiveTab('gallery')}>GALLERY</button>
              </div>
              <button className="close-btn" onClick={() => setSelectedMenu(null)}>[X] CLOSE</button>
            </div>
            <div className="modal-body-refined">
              {activeTab === 'story' ? (
                <div className="modal-grid-premium-no-border">
                  <div className="modal-visual-side-smooth">
                    <img src={selectedMenu.detailImgUrl} alt={selectedMenu.displayName} className="modal-main-img-smooth" />
                  </div>
                  <div className="modal-info-side">
                    <div className="info-scroll-wrapper">
                      <span className="tagline-gold">TRADITIONAL CUISINE</span>
                      <h2 className="modal-title-main">{selectedMenu.displayName}</h2>
                      <p className="modal-subtitle">{selectedMenu.subName}</p>
                      <div className="premium-separator"></div>
                      <div className="ingredients-container">
                        <span className="info-label">INGREDIENTS:</span>
                        <ul className="ingredients-list-grid">
                          {selectedMenu.ingredients?.map((item, idx) => (
                            <li key={idx} className="ingredient-item-bullet">— {item}</li>
                          ))}
                        </ul>
                      </div>
                      <p className="modal-description-text">{selectedMenu.story}</p>
                      <button className="directions-action-btn" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedMenu.address)}`, '_blank')}>NAVIGATE</button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="gallery-view-container" style={{ height: '100%', position: 'relative', overflow: 'hidden', background: '#000' }}>
                  <div className="video-vignette-mask" style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2, pointerEvents: 'none',
                    background: 'radial-gradient(circle, transparent 20%, rgba(0, 0, 0, 0.4) 55%, rgba(0, 0, 0, 0.9) 100%)'
                  }}></div>
                  <iframe src={`https://www.youtube.com/embed/${selectedMenu.youtubeId}?autoplay=1&modestbranding=1&rel=0&iv_load_policy=3`} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1, filter: 'brightness(1.05) contrast(1.1)' }} title="YouTube"></iframe>
                  <div className="video-meta-overlay" style={{ position: 'absolute', bottom: '40px', left: '40px', zIndex: 3, pointerEvents: 'none', fontFamily: '"Playfair Display", serif', textShadow: '0 10px 30px rgba(0,0,0,0.8)' }}>
                    <span style={{ color: '#c3a469', fontSize: '0.7rem', letterSpacing: '6px', display: 'block', marginBottom: '5px' }}>NOW VIEWING</span>
                    <h3 style={{ margin: 0, color: '#fff', fontSize: '1.8rem', fontWeight: '900', textTransform: 'uppercase' }}>
                      {selectedMenu.displayName}
                      <span style={{ fontSize: '1.2rem', fontWeight: '400', marginLeft: '15px', color: 'rgba(255,255,255,0.7)', textTransform: 'none', fontStyle: 'italic' }}>
                        {selectedMenu.subName}
                      </span>
                    </h3>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}