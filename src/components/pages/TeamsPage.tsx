import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { Formula1Teams } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronRight, Trophy, MapPin } from 'lucide-react';

export default function TeamsPage() {
  const [teams, setTeams] = useState<Formula1Teams[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    try {
      const result = await BaseCrudService.getAll<Formula1Teams>('teams');
      setTeams(result.items);
    } catch (error) {
      console.error('Error loading teams:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-charcoal text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="w-full max-w-[100rem] mx-auto px-8 md:px-16 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-heading text-5xl md:text-7xl font-black text-white mb-6">
            F1 <span className="text-accent-red">TEAMS</span>
          </h1>
          <p className="font-paragraph text-lg text-light-grey max-w-3xl leading-relaxed">
            Discover the constructors behind the world's fastest racing machines. Each team brings unique engineering excellence and racing heritage.
          </p>
        </motion.div>
      </section>

      {/* Teams Grid */}
      <section className="w-full max-w-[100rem] mx-auto px-8 md:px-16 pb-24">
        <div className="min-h-[600px]">
          {isLoading ? null : teams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teams.map((team, index) => (
                <motion.div
                  key={team._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={`/teams/${team._id}`}>
                    <div className="bg-medium-grey border border-light-grey border-opacity-10 rounded overflow-hidden hover:border-accent-red hover:border-opacity-50 transition-all duration-300 group cursor-pointer h-full flex flex-col">
                      {/* Team Logo */}
                      <div className="relative h-64 overflow-hidden bg-dark-charcoal flex items-center justify-center p-8">
                        {team.teamLogo && (
                          <Image
                            src={team.teamLogo}
                            alt={team.teamName || 'F1 Team'}
                            className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                            width={300}
                          />
                        )}
                      </div>

                      {/* Team Info */}
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="font-heading text-2xl font-bold text-white mb-3 group-hover:text-accent-red transition-colors duration-300">
                          {team.teamName}
                        </h3>
                        
                        {team.description && (
                          <p className="font-paragraph text-sm text-light-grey mb-4 line-clamp-3 leading-relaxed">
                            {team.description}
                          </p>
                        )}

                        <div className="space-y-2 mb-4 mt-auto">
                          {team.baseLocation && (
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-accent-red" />
                              <p className="font-paragraph text-sm text-light-grey">
                                {team.baseLocation}
                              </p>
                            </div>
                          )}
                          {team.championshipsWon !== undefined && (
                            <div className="flex items-center gap-2">
                              <Trophy className="w-4 h-4 text-accent-red" />
                              <p className="font-paragraph text-sm text-light-grey">
                                {team.championshipsWon} Championships
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center text-accent-red font-paragraph font-semibold text-sm group-hover:gap-2 transition-all duration-300">
                          View Details
                          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-paragraph text-lg text-light-grey">No teams found.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
