import React from 'react';
import vision_image from '../../../../images/vision.png'
import profile from '../../../../images/value.jpg';
import mission from '../../../../images/mission.svg'

const Intro = () => {
  return (
    <section className="py-20" >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center justify-center">
            <div>
              <div style={{ textAlign: 'center' }}>
                <img src={vision_image} alt="Our Vision" className="mb-4 mx-auto" style={{ width: '20%' }} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Our Vision</h3>
              <p className="text-lg text-center">
              Our Vision is to increase the freedom of money globally. We believe that by spreading this freedom, we can significantly improve lives around the world.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
          <div>
            <div style={{ textAlign: 'center' }}>
              <img src={mission} alt="Our Mission" className="mb-4 mx-auto" style={{ width: '14%' }} />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">Our Mission</h3>
            <p className="text-lg text-center">
            Our Mission is to provide the core infrastructure services for organizing the world's Crypto/Stocks.
            </p>
          </div>
        </div>
          
          <div className="flex items-center justify-center col-span-1 md:col-span-2 mt-4" id="our_values">
          <div>
          <div style={{ textAlign: 'center' }}>
            <img src={profile} alt="Our Values" className="mb-4 mx-auto" style={{ width: '14%' }} />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-center">Our Values</h3>
          <p className="text-lg text-center">
          Thecapex.pro Values guide our behavior, decisions, and  action, enabling unified collaboration across our diverse,  international teams.
          </p>
        </div>
        
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Intro;
