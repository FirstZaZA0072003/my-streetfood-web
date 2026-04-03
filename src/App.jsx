import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const FOOD_COLLECTIONS = [
  {
    id: 1,
    youtubeId: 'HcBCkAs5B7o',
    displayName: 'Thai Basil Stir-Fry',
    subName: '(Pad Ka-Prao)',
    imgUrl: '/images/food1_plate.jpg',
    detailImgUrl: '/images/food1_hd.jpg',
    extraImages: ['/images/f1_1.jpg', '/images/f1_2.jpg', '/images/f1_3.jpg'],
    address: "Market 61, Pracha Uthit 61, Thung Khru, Bangkok",
    story: "Known as the Holy Grail of Thai street food. Its soul lies in the Holy Basil, which provides a unique peppery aroma.",
    ingredients: ["Minced Pork", "Holy Basil", "Thai Chilies", "Garlic", "Fish Sauce", "Oyster Sauce", "Dark Soy Sauce"]
  },
  {
    id: 2,
    youtubeId: 'DmWeCTkhDvY',
    displayName: 'Thai Stir-Fried Noodles',
    subName: '(Pad Thai)',
    imgUrl: '/images/food2_plate.jpg',
    detailImgUrl: '/images/food2_hd.jpg',
    extraImages: ['/images/f2_1.jpg', '/images/f2_2.jpg', '/images/f2_3.jpg'],
    address: "Market 61, Pracha Uthit 61, Thung Khru, Bangkok",
    story: "Created in the 1930s to promote nationalism. It blends sweet, sour, and salty flavors.",
    ingredients: ["Rice Noodles", "Fresh Shrimp", "Hard Tofu", "Bean Sprouts", "Chives", "Tamarind Paste", "Palm Sugar", "Crushed Peanuts"]
  },
  {
    id: 3,
    youtubeId: 'M-8jxPCyvGs',
    displayName: 'Green Papaya Salad',
    subName: '(Som Tam)',
    imgUrl: '/images/food3_plate.jpg',
    detailImgUrl: '/images/food3_hd.jpg',
    extraImages: ['/images/f3_1.jpg', '/images/f3_2.jpg', '/images/f3_3.jpg'],
    address: "Market 61, Pracha Uthit 61, Thung Khru, Bangkok",
    story: "Originally a staple of Isan cuisine. It is a masterpiece of texture.",
    ingredients: ["Shredded Papaya", "Green Beans", "Cherry Tomatoes", "Dried Shrimp", "Roasted Peanuts", "Lime", "Palm Sugar", "Bird's Eye Chili"]
  },
  {
    id: 4,
    youtubeId: '5ugLHNTBGSI',
    displayName: 'Mango Sticky Rice',
    subName: '(Khao Niao Mamuang)',
    imgUrl: '/images/food4_plate.jpg',
    detailImgUrl: '/images/food4_hd.jpg',
    extraImages: ['/images/f4_1.jpg', '/images/f4_2.jpg', '/images/f4_3.jpg'],
    address: "Market 61, Thung Khru, Bangkok",
    story: "Represents the peak of Thai hospitality.",
    ingredients: ["Sweet Mango", "Glutinous Rice", "Coconut Milk", "Sugar", "Salt", "Pandan Leaves"]
  },
  {
    id: 5,
    youtubeId: 'gOz-GIBo03w',
    displayName: 'Thai Coconut Pancakes',
    subName: '(Khanom Khrok)',
    imgUrl: '/images/food5_plate.jpg',
    detailImgUrl: '/images/food5_hd.jpg',
    extraImages: ['/images/f5_1.jpg', '/images/f5_2.jpg', '/images/f5_3.jpg'],
    address: "Market 61, Thung Khru, Bangkok",
    story: "The ultimate Thai breakfast.",
    ingredients: ["Rice Flour", "Coconut Milk", "Sugar", "Salt", "Spring Onions"]
  },
  {
    id: 6,
    youtubeId: '6Xr5iQafPXM',
    displayName: 'Thai Grilled Pork',
    subName: '(Moo Ping)',
    imgUrl: '/images/food6_plate.jpg',
    detailImgUrl: '/images/food6_hd.jpg',
    extraImages: ['/images/f6_1.jpg', '/images/f6_2.jpg', '/images/f6_3.jpg'],
    address: "Market 61, Thung Khru, Bangkok",
    story: "Evolved for Thai tastes with a bold sauce.",
    ingredients: ["Pork Shoulder", "Coriander Root", "Garlic", "Black Pepper", "Coconut Milk"]
  },
  {
    id: 7,
    youtubeId: 'kZnc3YqNJ5Y',
    displayName: 'Thai Grilled Chicken',
    subName: '(Gai Yang)',
    imgUrl: '/images/food7_plate.jpg',
    detailImgUrl: '/images/food7_hd.jpg',
    extraImages: ['/images/f7_1.jpg', '/images/f7_2.jpg', '/images/f7_3.jpg'],
    address: "Market 61, Thung Khru, Bangkok",
    story: "Small servings designed for boat selling.",
    ingredients: ["Chicken Thigh", "Lemongrass", "Garlic", "Turmeric", "Fish Sauce"]
  },
  {
    id: 8,
    youtubeId: '-nnAKxbEggA',
    displayName: 'Thai Sweet Roti',
    subName: '(Ro-Tee)',
    imgUrl: '/images/food8_plate.jpg',
    detailImgUrl: '/images/food8_hd.jpg',
    extraImages: ['/images/f8_1.jpg', '/images/f8_2.jpg', '/images/f8_3.jpg'],
    address: "Market 61, Thung Khru, Bangkok",
    story: "An ancient dessert using local rice flour.",
    ingredients: ["Wheat Flour", "Butter", "Egg", "Condensed Milk", "Sugar", "Banana"]
  },
  {
    id: 9,
    youtubeId: 'Qq6e73LWDPM',
    displayName: 'Soy Sauce Noodles',
    subName: '(Pad See-Ew)',
    imgUrl: '/images/food9_plate.jpg',
    detailImgUrl: '/images/food9_hd.jpg',
    extraImages: ['/images/f9_1.jpg', '/images/f9_2.jpg', '/images/f9_3.jpg'],
    address: "Market 61, Thung Khru, Bangkok",
    story: "A smoky, wok-fired masterpiece.",
    ingredients: ["Wide Rice Noodles", "Chinese Broccoli", "Pork Slice", "Egg", "Dark Soy Sauce"]
  },
  {
    id: 10,
    youtubeId: '0EB9Eg-k8MQ',
    displayName: 'Thai Street Meatballs',
    subName: '(Look-Chin-Ping)',
    imgUrl: '/images/food10_plate.jpg',
    detailImgUrl: '/images/food10_hd.jpg',
    extraImages: ['/images/f10_1.jpg', '/images/f10_2.jpg', '/images/f10_3.jpg'],
    address: "KMUTT University, Pracha Uthit Road, Thung Khru, Bangkok",
    story: "The ultimate 'on-the-go' Thai snack. Its magic lies in the spicy-sweet tamarind glaze.",
    ingredients: ["Pork or Beef Meatballs", "Tamarind Paste", "Dried Red Chilies", "Palm Sugar", "Garlic", "Coriander Roots"]
  }
];

export default function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [activeTab, setActiveTab] = useState('story');
  const [heroMouse, setHeroMouse] = useState({ x: 0, y: 0 });
  const [isMuted, setIsMuted] = useState(true);

  const canvasRef = useRef(null);
  const tableGroupRef = useRef(null);
  const obsRef = useRef(null);
  const stateRef = useRef({ index: -1, isAnimating: false });
  const mouse = useRef({ x: 0, y: 0 });

  const isMobile = () => window.innerWidth <= 768;

const handleOpenMap = (address) => {
    // saddr=My+Location จะสั่งให้ Google Maps ใช้จุดปัจจุบันเป็นจุดเริ่มต้นอัตโนมัติ
    const navigationUrl = `https://www.google.com/maps?saddr=My+Location&daddr=${encodeURIComponent(address)}`;
    window.open(navigationUrl, '_blank');
  };

  useEffect(() => {
    if (selectedMenu) {
      if (obsRef.current) obsRef.current.disable();
    } else {
      if (obsRef.current) obsRef.current.enable();
    }
  }, [selectedMenu]);

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
    let loaded = 0;
    scripts.forEach(src => {
      const s = document.createElement('script'); s.src = src; s.async = false;
      s.onload = () => { if (++loaded === scripts.length) initThree(); };
      document.head.appendChild(s);
    });

    function initThree() {
      const THREE = window.THREE; const gsap = window.gsap; const { Observer } = window;
      gsap.registerPlugin(Observer);

      const scene = new THREE.Scene();
      const fov = isMobile() ? 45 : 35;
      const camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 10, 10000);
      camera.position.set(0, 650, 2100);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputEncoding = THREE.sRGBEncoding;
      if (canvasRef.current) canvasRef.current.appendChild(renderer.domElement);

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      const mainLight = new THREE.DirectionalLight(0xfff5e6, 1.2);
      mainLight.position.set(0, 1500, 800);
      scene.add(mainLight);

      const tableGroup = new THREE.Group();
      tableGroup.position.y = -2500;
      scene.add(tableGroup);
      tableGroupRef.current = tableGroup;

      const loader = new THREE.TextureLoader();
      const spacing = isMobile() ? 1800 : 2800;
      const plateScale = isMobile() ? 0.75 : 1;

      FOOD_COLLECTIONS.forEach((menu, i) => {
        const group = new THREE.Group();
        group.position.x = i * spacing;

        const plate = new THREE.Mesh(
          new THREE.CylinderGeometry(290 * plateScale, 240 * plateScale, 45 * plateScale, 64),
          new THREE.MeshPhysicalMaterial({ color: 0xfffaf0, roughness: 0.15, clearcoat: 1.0, metalness: 0.02 })
        );
        plate.position.y = 75 * plateScale;
        group.add(plate);

        const foodTex = loader.load(menu.imgUrl);
        foodTex.encoding = THREE.sRGBEncoding;
        const food = new THREE.Mesh(
          new THREE.CircleGeometry(255 * plateScale, 64),
          new THREE.MeshStandardMaterial({ map: foodTex, roughness: 0.5 })
        );
        food.rotation.x = -Math.PI / 2;
        food.position.y = 98.1 * plateScale;
        group.add(food);
        tableGroup.add(group);
      });

      const animate = () => {
        if (stateRef.current.index !== -1 && tableGroupRef.current) {
          const targetX = selectedMenu ? 0 : (mouse.current.y * 0.05);
          const targetY = selectedMenu ? 0 : (mouse.current.x * 0.05);
          tableGroup.rotation.x += (targetX - tableGroup.rotation.x) * 0.05;
          tableGroup.rotation.y += (targetY - tableGroup.rotation.y) * 0.05;
          camera.lookAt(tableGroup.position.x + (stateRef.current.index * spacing), 100, 0);
        }
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };
      animate();

      const goToStep = (nextIndex, direction) => {
        if (stateRef.current.isAnimating || selectedMenu) return;
        if (stateRef.current.index === 0 && direction === "up") {
          stateRef.current.isAnimating = true;
          gsap.to(tableGroup.position, { y: -2500, duration: 1.8, ease: "power4.inOut" });
          gsap.to(".landing-screen", { opacity: 1, scale: 1, pointerEvents: 'all', duration: 1.4, onComplete: () => { stateRef.current.index = -1; setIsStarted(false); stateRef.current.isAnimating = false; } });
        } else if (stateRef.current.index === -1 && direction === "down") {
          stateRef.current.isAnimating = true; setIsStarted(true);
          gsap.to(tableGroup.position, { y: -220, duration: 2.2, ease: "expo.out" });
          gsap.to(".landing-screen", { opacity: 0, scale: 1.15, pointerEvents: 'none', duration: 1.6, onComplete: () => { stateRef.current.index = 0; stateRef.current.isAnimating = false; } });
        } else if (nextIndex >= 0 && nextIndex < FOOD_COLLECTIONS.length) {
          stateRef.current.isAnimating = true; stateRef.current.index = nextIndex; setCurrentIndex(nextIndex);
          gsap.to(tableGroup.position, { x: -(nextIndex * spacing), duration: 2, ease: "power4.inOut", onComplete: () => { stateRef.current.index = nextIndex; stateRef.current.isAnimating = false; } });
        }
      };

      obsRef.current = Observer.create({
        target: window,
        type: "wheel,touch,pointer",
        onDown: () => goToStep(stateRef.current.index + 1, "down"),
        onUp: () => goToStep(stateRef.current.index - 1, "up"),
        tolerance: 50,
        preventDefault: true
      });

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    }
  }, [selectedMenu]);

  return (
    <div className="app-container" onMouseMove={handleHeroMouseMove}>
      {/* Landing Screen */}
      <div className={`landing-screen ${isStarted ? 'started' : ''}`}>
        <div className="hero-bg-glow"></div>
        <div className="pl-parallax-container">
          <div className="v2-blob-shape"></div>
          {FOOD_COLLECTIONS.slice(0, 9).map((plate, idx) => (
            <div key={idx} className="pl-floating-plate-unit"
              style={{
                top: ['5%', '12%', '65%', '78%', '35%', '3%', '55%', '82%', '45%'][idx],
                left: ['-8%', '68%', '2%', '80%', '85%', '35%', '38%', '10%', '50%'][idx],
                zIndex: idx * 5,
                transform: `translate(${heroMouse.x * (idx + 10)}px, ${heroMouse.y * (idx + 10)}px)`,
                filter: `blur(${idx % 2 === 0 ? '2px' : '0px'})`
              }}>
              <div className="pl-ceramic-plate" style={{ width: isMobile() ? '150px' : '250px', height: isMobile() ? '150px' : '250px', backgroundImage: `url(${plate.imgUrl})` }}>
                <div className="plate-glare-effect"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="hero-box-v2">
          <div className="hero-header-meta">ESTABLISHED 2026</div>
          <h1 className="hero-title-v2"><span className="v2-title-top">THE ART OF</span><span className="v2-title-mid">STREET FOOD</span><span className="v2-title-bot">THAI</span></h1>
          <div className="hero-separator-v3"></div>
          <p className="hero-tag-v2">A Curated Culinary Journey Through Thailand’s Vibrant Soul</p>
          <div className="scroll-explorer-v2"><div className="scroll-line-v2"></div><span className="scroll-text-v2">SCROLL DOWN TO START</span></div>
        </div>
      </div>

      {/* Experience View */}
      <div className={`experience-view ${isStarted ? 'visible' : ''}`}>
        <div className="canvas-container" ref={canvasRef} />

        {/* Mobile Swipe Hint */}
        {!selectedMenu && (
          <div className="mobile-scroll-hint">
            <div className="mouse-wheel">
              <div className="scroll-inner"></div>
            </div>
            <span className="hint-text">SWIPE TO EXPLORE</span>
            <div className="arrow-down-v2"></div>
          </div>
        )}

        <div className="view-extra-gallery">
          {FOOD_COLLECTIONS[currentIndex]?.extraImages?.map((imgUrl, idx) => (
            <div key={idx} className={`floating-img-unit pos-${idx}`} style={{
              transform: `translate(${heroMouse.x * (idx * 20 + 20)}px, ${heroMouse.y * (idx * 20 + 20)}px)`
            }}>
              <img src={imgUrl} alt="bg-dish" className="extra-bg-img" />
            </div>
          ))}
        </div>

        <div className="main-ui-overlay-v2">
          <div className="ui-top-meta">TRADITIONAL HERITAGE — 2026</div>
          <div className="ui-mid-content">
            <div className="dish-info-main">
              <span className="collection-count">COLLECTION {currentIndex + 1}/10</span>
              <h2 className="v2-dish-name">{FOOD_COLLECTIONS[currentIndex]?.displayName}</h2>
              <p className="v2-dish-sub">{FOOD_COLLECTIONS[currentIndex]?.subName}</p>
              <div className="v2-separator"></div>
            </div>
          </div>
          <div className="ui-bottom-bar">
            <button className="v2-explore-btn" onClick={() => { setSelectedMenu(FOOD_COLLECTIONS[currentIndex]); setActiveTab('story'); }}>
              VIEW DETAILS & STORY — [ OPEN ]
            </button>
          </div>
        </div>
      </div>

      {/* Modal Detail */}
      {selectedMenu && (
        <div className="modal-overlay" onClick={() => setSelectedMenu(null)}>
          <div className="modal-content-premium" onClick={e => e.stopPropagation()}>
            <div className="modal-header-new">
              <div className="header-meta">BANGKOK / THAILAND</div>
              <div className="modal-tabs">
                <button className={`tab-btn ${activeTab === 'story' ? 'active' : ''}`} onClick={() => setActiveTab('story')}>THE STORY</button>
                <button className={`tab-btn ${activeTab === 'gallery' ? 'active' : ''}`} onClick={() => setActiveTab('gallery')}>THE GALLERY</button>
              </div>
              <button className="close-btn" onClick={() => setSelectedMenu(null)}>CLOSE [X]</button>
            </div>

            <div className="modal-body-refined">
              {activeTab === 'story' ? (
                <div className="modal-grid-premium-no-border">
                  <div className="modal-visual-side-smooth">
                    <div className="image-wrapper-smooth">
                      <img src={selectedMenu.detailImgUrl} alt={selectedMenu.displayName} className="modal-main-img-smooth" />
                    </div>
                  </div>
                  <div className="modal-info-side">
                    <div className="info-scroll-wrapper">
                      <span className="tagline-gold">TRADITIONAL CUISINE</span>
                      <h2 className="modal-title-main">
                        {selectedMenu.displayName}
                        <span className="modal-subtitle" style={{ display: 'block', fontSize: '1.4rem', color: '#888', fontStyle: 'italic', marginTop: '10px' }}>{selectedMenu.subName}</span>
                      </h2>
                      <div className="premium-separator"></div>
                      <div className="ingredients-container">
                        <span className="info-label">INGREDIENTS:</span>
                        <ul className="ingredients-list-grid">
                          {selectedMenu.ingredients?.map((item, idx) => (
                            <li key={idx} className="ingredient-item-bullet"><span className="bullet-dot">—</span> {item}</li>
                          ))}
                        </ul>
                      </div>
                      <p className="modal-description-text">{selectedMenu.story}</p>
                      <div className="location-box-premium">
                        <span className="loc-label">LOCAL MARKET:</span>
                        <p className="loc-address">{selectedMenu.address}</p>
                        <button className="directions-action-btn" onClick={() => handleOpenMap(selectedMenu.address)}>
                          START NAVIGATION
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="gallery-view-container">
                  <div className="video-player-frame">
                    {activeTab === 'gallery' && (
                      <iframe
                        key={selectedMenu.id}
                        src={`https://www.youtube.com/embed/${selectedMenu.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                        title="YouTube Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          border: 'none'
                        }}
                      ></iframe>
                    )}
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