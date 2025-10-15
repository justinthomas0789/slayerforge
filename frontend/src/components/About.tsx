import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client/core';
import { Swords, Shield, Heart } from 'lucide-react';

interface TeamMember {
  documentId: string;
  name: string;
  role: string;
  breathingStyle?: string;
  bio?: string;
  order: number;
  photo?: {
    url: string;
    alternativeText?: string;
  };
}

interface TeamMembersResponse {
  teamMembers: TeamMember[];
}

const GET_TEAM_MEMBERS = gql`
  query GetTeamMembers {
    teamMembers(sort: "order:asc") {
      documentId
      name
      role
      breathingStyle
      bio
      order
      photo {
        url
        alternativeText
      }
    }
  }
`;

// Breathing style color mapping
const getBreathingColor = (breathingStyle: string = ''): string => {
  const style = breathingStyle.toLowerCase();
  if (style.includes('flame')) return 'text-pink-400';
  if (style.includes('water')) return 'text-purple-400';
  if (style.includes('thunder')) return 'text-blue-400';
  if (style.includes('wind')) return 'text-green-400';
  if (style.includes('stone')) return 'text-indigo-400';
  if (style.includes('mist')) return 'text-cyan-400';
  if (style.includes('serpent')) return 'text-yellow-400';
  if (style.includes('love')) return 'text-pink-400';
  if (style.includes('insect')) return 'text-orange-400';
  if (style.includes('sound')) return 'text-teal-400';
  if (style.includes('moon')) return 'text-red-400';
  if (style.includes('sun')) return 'text-violet-400';
  return 'text-gray-400';
};

export const About: React.FC = () => {
  const { loading, error, data } = useQuery<TeamMembersResponse>(GET_TEAM_MEMBERS);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-purple-600/20"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              About SlayerForge
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Crafting legendary equipment for demon slayers since the Taisho Era
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl font-bold text-white mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-300 text-lg">
              <p>
                Born from the ancient traditions of the Demon Slayer Corps, SlayerForge stands as the 
                premier destination for authentic demon slaying equipment and training materials.
              </p>
              <p>
                Every product in our arsenal is crafted with the same dedication and precision that 
                the legendary swordsmiths of the Swordsmith Village brought to their Nichirin blades. 
                We honor the legacy of those who fought to protect humanity from the demons that lurk 
                in the shadows.
              </p>
              <p>
                Whether you're a seasoned Hashira or just beginning your journey with the Corps, 
                SlayerForge provides the tools you need to master your breathing techniques and 
                become the demon slayer you were meant to be.
              </p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            {/* Main story image - Upload your "About Us" hero image to Strapi and update the path */}
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="http://localhost:1337/uploads/demon_slayer_5120x2880_22988_453e130844.jpg"
                alt="SlayerForge Story"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 hover:border-pink-500/50 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <Swords className="h-12 w-12 text-pink-500" />
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-3">
                Authentic Craftsmanship
              </h3>
              <p className="text-gray-300 text-center">
                Every item is crafted with the same attention to detail as the legendary Nichirin blades, 
                ensuring authenticity and quality.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 hover:border-pink-500/50 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <Shield className="h-12 w-12 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-3">
                Demon Slayer Spirit
              </h3>
              <p className="text-gray-300 text-center">
                We embody the determination and courage of the Demon Slayer Corps in everything we do.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 hover:border-pink-500/50 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <Heart className="h-12 w-12 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-3">
                Community First
              </h3>
              <p className="text-gray-300 text-center">
                Like the Corps, we believe in the strength of unity and supporting our fellow slayers.
              </p>
            </div>
          </div>
        </div>

        {/* Meet Our Team Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-4">Meet Our Team</h2>
          <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            Our elite squad of demon slayers, each bringing unique skills and breathing techniques to serve you better
          </p>

          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
              <p className="text-gray-300">Loading team members...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-red-600">
                  Unable to load team members. Please make sure you've set up the Team Member content type in Strapi.
                  <br />
                  <span className="text-sm">See TEAM_MEMBERS_SETUP.md for instructions.</span>
                </p>
              </div>
            </div>
          )}

          {data?.teamMembers && data.teamMembers.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data.teamMembers.map((member) => (
                <div
                  key={member.documentId}
                  className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 hover:border-pink-500/50 transition-all duration-300 group"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={
                        member.photo?.url
                          ? `http://localhost:1337${member.photo.url}`
                          : 'https://via.placeholder.com/400x400?text=No+Photo'
                      }
                      alt={member.photo?.alternativeText || member.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                    {member.breathingStyle && (
                      <p className={`text-sm mb-1 ${getBreathingColor(member.breathingStyle)}`}>
                        {member.breathingStyle}
                      </p>
                    )}
                    <p className="text-xs text-gray-400">{member.role}</p>
                    {member.bio && (
                      <p className="text-xs text-gray-500 mt-2 line-clamp-2">{member.bio}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {data?.teamMembers && data.teamMembers.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-yellow-800">
                  No team members found. Please add team members in Strapi Content Manager.
                </p>
              </div>
            </div>
          )}
        </div>



        {/* Stats Section */}
        <div className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-pink-500 mb-2">10K+</div>
              <div className="text-gray-300">Slayers Equipped</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-500 mb-2">500+</div>
              <div className="text-gray-300">Products</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-500 mb-2">50+</div>
              <div className="text-gray-300">Breathing Styles</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-red-500 mb-2">100%</div>
              <div className="text-gray-300">Authentic</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Explore our arsenal of legendary equipment and start your path to becoming a demon slayer.
          </p>
          <Link
            to="/products"
            className="inline-block bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            Explore Products
          </Link>
        </div>
      </div>
    </div>
  );
};
