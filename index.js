
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

// Data for the towns has been updated for a more factual, balanced tone.
const townData = {
  historical: [
    {
      name: 'Historic Cairo',
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Mosque-Madrassa_of_Sultan_Hassan_2017_2.jpg',
      details: [
        { title: 'What was it?', content: 'A major capital of powerful Islamic empires, like the Mamluk Sultanate. It was a world-leading center for science, art, and trade.' },
        { title: 'The Story', content: 'Founded in the 10th century, it became one of the world\'s most important cities. Its markets (souks) were filled with spices and goods from across the known world.' },
        { title: 'Economy', content: 'Centered on skilled artisans creating intricate metalwork, glass, and textiles. Trade was the other major pillar, connecting Africa, Asia, and Europe.' },
        { title: 'Architecture', content: 'Famous for its stunning mosques, madrasas (schools), and tall residential buildings tightly packed along narrow, winding streets.' },
        { title: 'Culture', content: 'A bustling, cosmopolitan city. It was home to the prestigious Al-Azhar University, attracting scholars and students from all over.' },
        { title: 'Transportation', content: 'Primarily on foot. Donkeys and camels were used for goods and wealthier travelers. The Nile River was the main artery for long-distance trade via boats.' },
      ]
    },
    {
      name: 'Historic Mecca (c. 1880s)',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Mecca_from_the_east%2C_c._1880s.jpg/1920px-Mecca_from_the_east%2C_c._1880s.jpg',
      details: [
        { title: 'What was it?', content: 'The holiest city in Islam. A relatively small town whose entire existence revolved around the annual Hajj pilgrimage.' },
        { title: 'The Story', content: 'For centuries, under Ottoman rule, the city\'s primary function was to host pilgrims. Its rhythm of life was dictated by the Islamic calendar.' },
        { title: 'Economy', content: 'Almost entirely based on pilgrimage services. Locals provided lodging, food, water, and guidance to pilgrims who had traveled for months.' },
        { title: 'Architecture', content: 'Characterized by traditional stone and adobe brick houses with beautiful wooden lattice balconies called \'rawashin\' for ventilation and privacy.' },
        { title: 'Culture', content: 'Deeply religious and traditional. Life was slow-paced outside of the Hajj season, focused on faith and community.' },
        { title: 'Transportation', content: 'Exclusively on foot within the city. Pilgrims arrived in vast caravans of camels after journeys that could take many months.' },
      ]
    }
  ],
  presentDay: [
    {
      name: 'Modern Dubai',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop',
      details: [
        { title: 'What is it?', content: 'A global hub for finance, tourism, and logistics. It is known for its futuristic ambition and record-breaking skyscrapers.' },
        { title: 'The Story', content: 'After the discovery of oil in the 1960s, its leaders strategically invested in creating a post-oil economy, leading to explosive growth from the 1990s onward.' },
        { title: 'Economy', content: 'Highly diversified. Key sectors include finance, real estate, aviation (Emirates airline), tourism, and luxury retail.' },
        { title: 'Architecture', content: 'Defined by superlatives: home to the world\'s tallest building (Burj Khalifa), man-made islands (Palm Jumeirah), and other iconic structures.' },
        { title: 'Culture', content: 'Extremely diverse, with expatriates making up over 85% of the population. It blends global cultures with its Emirati roots.' },
        { title: 'Transportation', content: 'Dominated by cars on multi-lane highways. A state-of-the-art, driverless metro system provides an efficient public transit alternative.' },
      ]
    },
     {
      name: 'Modern Mecca',
      image: 'https://images.unsplash.com/photo-1563291588-7a552277c220?q=80&w=2002&auto=format&fit=crop',
      details: [
        { title: 'What is it?', content: 'A holy "smart city" engineered to manage the logistics of accommodating millions of pilgrims for the Hajj and Umrah pilgrimages.' },
        { title: 'The Story', content: 'Massive expansion projects, especially since the early 2000s, aimed to drastically increase the capacity of the Grand Mosque and the city.' },
        { title: 'Economy', content: 'Religious tourism is the dominant industry, valued in the tens of billions of dollars. Global hotel chains and retailers are major players.' },
        { title: 'Architecture', content: 'Dominated by the gigantic Grand Mosque expansion and the colossal Abraj Al-Bait Towers, which contains a massive clock, hotels, and a shopping mall.' },
        { title: 'Culture', content: 'A unique blend of profound religious devotion and modern hyper-consumerism. Pilgrims from every country in the world converge here.' },
        { title: 'Transportation', content: 'A complex network of pedestrian tunnels, highways, and a dedicated Hajj-only metro line. A high-speed railway connects it to other Saudi cities.' },
      ]
    }
  ]
};

const meccaComparisonData = [
    { aspect: 'Purpose & Scale', then: 'A small, traditional town focused on a spiritual journey undertaken by a few hundred thousand people a year.', now: 'A huge "megaproject" city engineered to efficiently manage millions of pilgrims with modern infrastructure.' },
    { aspect: 'Architecture', then: 'Locally sourced materials like stone and mud brick. Human-scaled buildings with traditional designs like the rawashin balconies.', now: 'Dominated by steel, glass, and concrete skyscrapers. The Abraj Al-Bait clock tower is one of the tallest buildings in the world.' },
    { aspect: 'The Journey', then: 'A difficult, months-long overland journey by camel caravan, fraught with danger and adventure.', now: 'A safe and fast journey, typically by airplane, followed by high-speed trains and air-conditioned buses.' },
    { aspect: 'Economy', then: 'A local economy where town families provided lodging and sold supplies directly to pilgrims.', now: 'A massive, multi-billion dollar global industry involving international hotel chains, airlines, and corporations.' },
    { aspect: 'View of the Kaaba', then: 'Viewed from the ground level of the original mosque courtyard, surrounded by historic neighborhoods.', now: 'Often viewed from a hotel room hundreds of feet in the air, next to multi-story shopping malls inside the complex.' },
];

const GlobalStyles = () => (
  React.createElement('style', null, `
    .app-container {
      width: 100%;
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem 3rem;
      color: #333;
      background-color: #f8f5f0;
    }
    .main-header {
      text-align: center;
      margin-bottom: 4rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid #dcd1b8;
    }
    .main-title {
      font-family: 'Playfair Display', serif;
      font-size: 4rem;
      color: #2c3e50;
      margin: 0;
    }
    .main-subtitle {
      font-size: 1.2rem;
      color: #7f8c8d;
      margin-top: 0.5rem;
    }
    .section-title {
      font-family: 'Playfair Display', serif;
      font-size: 2.8rem;
      color: #34495e;
      border-bottom: 2px solid #c8bda6;
      padding-bottom: 1rem;
      margin-top: 4rem;
      margin-bottom: 2.5rem;
    }
    .towns-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
      gap: 3rem;
    }
    .town-card {
      background-color: #fff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 5px 15px rgba(0,0,0,0.07);
      transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
      display: flex;
      flex-direction: column;
    }
    .town-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 30px rgba(0,0,0,0.12);
    }
    .town-card-image-wrapper {
      position: relative;
      width: 100%;
      height: 350px;
      overflow: hidden;
    }
    .town-card-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s ease;
    }
    .town-card:hover .town-card-image {
      transform: scale(1.05);
    }
    .town-card-title-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 3rem 1.5rem 1.5rem;
      background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
    }
    .town-card-title {
      font-family: 'Playfair Display', serif;
      font-size: 1.8rem;
      color: #fff;
      margin: 0;
    }
    .town-card-content {
      padding: 2rem;
      flex-grow: 1;
    }
    .detail-item {
      margin-bottom: 1.25rem;
      line-height: 1.7;
      font-size: 1.05rem;
    }
    .detail-title {
      font-weight: 700;
      color: #34495e;
    }
    .interactive-section-controls {
      text-align: center;
      margin-top: 4rem;
      margin-bottom: 1rem;
    }
    .control-button {
      font-family: 'Playfair Display', serif;
      font-size: 1.2rem;
      background-color: transparent;
      color: #34495e;
      border: 2px solid #dcd1b8;
      padding: 0.8rem 1.8rem;
      margin: 0 0.5rem;
      border-radius: 50px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .control-button:hover {
      background-color: #34495e;
      color: #fff;
      border-color: #34495e;
    }
    .control-button.active {
      background-color: #b3a283;
      color: #fff;
      border-color: #b3a283;
    }
    .comparison-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 2rem;
      box-shadow: 0 5px 15px rgba(0,0,0,0.07);
      border-radius: 8px;
      overflow: hidden;
    }
    .comparison-table th, .comparison-table td {
      padding: 1.5rem;
      text-align: left;
      border-bottom: 1px solid #e8e0d1;
    }
    .comparison-table th {
      font-family: 'Playfair Display', serif;
      font-size: 1.3rem;
      background-color: #34495e;
      color: #fff;
    }
    .comparison-table td {
      line-height: 1.6;
      vertical-align: top;
    }
    .comparison-table tbody tr:nth-child(even) {
      background-color: #fff;
    }
    .comparison-table tbody tr:nth-child(odd) {
      background-color: #fdfaf6;
    }
    .comparison-table strong {
      color: #2c3e50;
      font-size: 1.1rem;
    }
    .content-section {
        margin-top: 2rem;
    }
    .reflection-section {
      padding: 3rem;
      background-color: #e8e0d1;
      border-radius: 8px;
      border-left: 8px solid #b3a283;
    }
    .reflection-section .section-title, .bibliography-section .section-title {
      border-bottom: none;
      margin-top: 0;
    }
    .reflection-title {
       font-family: 'Playfair Display', serif;
       color: #34495e;
       font-size: 1.5rem;
       margin-top: 1.5rem;
       margin-bottom: 0.5rem;
    }
    .reflection-text {
      font-size: 1.1rem;
      line-height: 1.8;
      color: #4a4a4a;
    }
    .bibliography-section {
      padding: 2.5rem;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.05);
      border-top: 4px solid #34495e;
    }
    .bibliography-section ul {
        list-style-position: inside;
        padding-left: 1rem;
    }
    .bibliography-section a {
        color: #3498db;
        text-decoration: none;
    }
    .bibliography-section a:hover {
        text-decoration: underline;
    }
    .fade-in-section {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .fade-in-section.is-visible {
      opacity: 1;
      transform: translateY(0);
    }
    .main-footer-credit {
      text-align: center;
      margin-top: 4rem;
      padding: 2rem;
      background-color: #34495e;
      color: #f8f5f0;
      font-size: 1.2rem;
      font-family: 'Playfair Display', serif;
    }
  `)
);

// Custom hook to detect when an element is on screen.
// This has been fixed to be more performant and reliable.
const useOnScreen = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        },
        options
    );

    const currentRef = ref.current;
    if (currentRef) {
        observer.observe(currentRef);
    }

    return () => {
        if(currentRef) {
           observer.disconnect();
        }
    };
  }, []); // Empty dependency array ensures this runs only once.

  return [ref, isVisible];
};

const AnimatedSection = ({ children, className = '' }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  return (
    React.createElement('div', { ref, className: `${className} fade-in-section ${isVisible ? 'is-visible' : ''}` },
      children
    )
  );
};

const TownCard = ({ town }) => {
  return (
    React.createElement('article', { className: "town-card" },
      React.createElement('div', { className: "town-card-image-wrapper" },
        React.createElement('img', { src: town.image, alt: town.name, className: "town-card-image" }),
        React.createElement('div', { className: "town-card-title-overlay" },
           React.createElement('h3', { className: "town-card-title" }, town.name)
        )
      ),
      React.createElement('div', { className: "town-card-content" },
        town.details.map((item, index) => (
          React.createElement('div', { key: index, className: "detail-item" },
            React.createElement('span', { className: "detail-title" }, item.title), ` ${item.content}`
          )
        ))
      )
    )
  );
};

const App = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(prev => prev === section ? null : section);
  };

  return (
    React.createElement(React.Fragment, null,
      React.createElement(GlobalStyles, null),
      React.createElement('div', { style: {width: '100%'} },
        React.createElement('main', { className: "app-container" },
          React.createElement('header', { className: "main-header" },
            React.createElement('h1', { className: "main-title" }, "Towns Through Time"),
            React.createElement('p', { className: "main-subtitle" }, "A Comparative Study of Historical and Modern Cities")
          ),

          React.createElement(AnimatedSection, null,
            React.createElement('h2', { className: "section-title" }, "Historical Cities"),
            React.createElement('div', { className: "towns-container" },
              townData.historical.map((town, index) => React.createElement(TownCard, { key: index, town: town }))
            )
          ),
          
          React.createElement(AnimatedSection, null,
            React.createElement('h2', { className: "section-title" }, "Modern Hubs"),
            React.createElement('div', { className: "towns-container" },
              townData.presentDay.map((town, index) => React.createElement(TownCard, { key: index, town: town }))
            )
          ),

          React.createElement(AnimatedSection, { className: "interactive-section-controls" },
            React.createElement('button', {
              className: `control-button ${activeSection === 'comparison' ? 'active' : ''}`,
              onClick: () => toggleSection('comparison')
            }, "Compare Mecca"),
            React.createElement('button', {
              className: `control-button ${activeSection === 'reflection' ? 'active' : ''}`,
              onClick: () => toggleSection('reflection')
            }, "My Reflection"),
            React.createElement('button', {
              className: `control-button ${activeSection === 'bibliography' ? 'active' : ''}`,
              onClick: () => toggleSection('bibliography')
            }, "Bibliography")
          ),

          activeSection === 'comparison' && (
            React.createElement(AnimatedSection, { className: "content-section" },
              React.createElement('h2', { className: "section-title" }, "Spotlight: Mecca - Then vs. Now"),
              React.createElement('p', { className: "detail-item" }, "Mecca's transformation is one of the most dramatic in modern history. It evolved from an ancient pilgrimage town into a futuristic megacity built for millions. Here's the breakdown:"),
              React.createElement('table', { className: "comparison-table" },
                React.createElement('thead', null,
                  React.createElement('tr', null,
                    React.createElement('th', { style: {width: '25%'} }, "Aspect"),
                    React.createElement('th', null, "Then (c. 1880s)"),
                    React.createElement('th', null, "Now (Present Day)")
                  )
                ),
                React.createElement('tbody', null,
                  meccaComparisonData.map((row, index) => (
                      React.createElement('tr', { key: index },
                          React.createElement('td', null, React.createElement('strong', null, row.aspect)),
                          React.createElement('td', null, row.then),
                          React.createElement('td', null, row.now)
                      )
                  ))
                )
              )
            )
          ),
          
          activeSection === 'reflection' && (
            React.createElement(AnimatedSection, { className: "content-section" },
              React.createElement('section', { className: "reflection-section" },
                React.createElement('h2', { className: "section-title" }, "My Thoughts & Reflection"),
                React.createElement('h3', { className: "reflection-title" }, "What Surprised Me"),
                React.createElement('p', { className: "reflection-text" },
                  "The most shocking thing was the sheer speed and scale of change in Dubai and Mecca. It wasn't gradual evolution; it was a total rebuild. The contrast in Mecca is particularly fascinating: the world's most advanced technology and massive construction projects are all used to support an ancient religious ritual. It’s like using a spaceship to visit a historical monument."
                ),
                React.createElement('h3', { className: "reflection-title" }, "Are Modern Towns Better or Worse?"),
                React.createElement('p', { className: "reflection-text" },
                  "It's a trade-off. Modern cities provide incredible safety, comfort, and efficiency. Air conditioning and high-speed rail are definite improvements over month-long camel journeys! However, something is lost. Older cities like Historic Cairo had a unique, chaotic character in their winding streets. Modern, master-planned cities can sometimes feel sterile or impersonal, like a giant airport terminal. They're efficient, but can lack a sense of discovery and soul."
                ),
                React.createElement('h3', { className: "reflection-title" }, "What Features from the Past Should We Keep?"),
                React.createElement('p', { className: "reflection-text" },
                  "We should prioritize building cities for people, not just for cars. The walkability of old towns, with mixed-use buildings where people lived, worked, and shopped in the same area, created vibrant communities. We should also value unique architecture over generic glass towers. The goal shouldn't be to erase history, but to build a future that learns from the best parts of the past—creating cities that are both efficient and full of character."
                )
              )
            )
          ),
          
          activeSection === 'bibliography' && (
             React.createElement(AnimatedSection, { className: "content-section" },
                React.createElement('section', { className: "bibliography-section" },
                    React.createElement('h2', { className: "section-title" }, "Bibliography"),
                    React.createElement('p', { className: "reflection-text" },
                        "For this report, I consulted a mix of scholarly and highly questionable sources:"
                    ),
                    React.createElement('ul', null,
                        React.createElement('li', { className: "reflection-text" }, React.createElement('a', { href: "https://en.wikipedia.org/wiki/Mecca", target: "_blank", rel: "noopener noreferrer" }, 'Wikipedia - "Mecca"')),
                        React.createElement('li', { className: "reflection-text" }, React.createElement('a', { href: "https://en.wikipedia.org/wiki/Islamic_Cairo", target: "_blank", rel: "noopener noreferrer" }, 'Wikipedia - "Islamic Cairo"')),
                        React.createElement('li', { className: "reflection-text" }, "National Geographic's encyclopedia on medieval towns."),
                        React.createElement('li', { className: "reflection-text" }, "Reuters for modern cities."),
                        React.createElement('li', { className: "reflection-text" }, "A Very Smart Pigeon I Interviewed in Cairo.")
                    )
                )
             )
          )

        ),
        React.createElement('footer', { className: "main-footer-credit" },
          React.createElement('p', null, "Made by Mohammad Shahan Khan, Grade 7A")
        )
      )
    )
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    React.createElement(React.StrictMode, null,
      React.createElement(App, null)
    )
  );
}
