import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { Formula1Teams } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, MapPin, User, Trophy, ExternalLink } from 'lucide-react';

export default function TeamDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [team, setTeam] = useState<Formula1Teams | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTeam();
  }, [id]);

  const loadTeam = async () => {
    if (!id) return;
    
    try {
      const data = await BaseCrudService.getById<Formula1Teams>('teams', id);
      setTeam(data);
    } catch (error) {
      console.error('Error loading team:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-charcoal text-foreground">
      <Header />

      <div className="w-full max-w-[100rem] mx-auto px-8 md:px-16 py-16 min-h-[600px]">
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <LoadingSpinner />
          </div>
        ) : !team ? (
          <div className="text-center py-24">
            <h2 className="font-heading text-3xl font-bold text-white mb-4">Team Not Found</h2>
            <p className="font-paragraph text-lg text-light-grey mb-8">
              The team you're looking for doesn't exist.
            </p>
            <Link to="/teams">
              <button className="bg-accent-red text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded hover:bg-opacity-90 transition-all duration-300">
                Back to Teams
              </button>
            </Link>
          </div>
        ) : (
          <>
            {/* Back Button */}
            <Link to="/teams">
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-2 text-light-grey hover:text-accent-red font-paragraph font-medium mb-8 transition-colors duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Teams
              </motion.button>
            </Link>

            {/* Team Detail */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Logo Section */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="relative h-[600px] rounded overflow-hidden bg-medium-grey flex items-center justify-center p-12">
                  {team.teamLogo && (
                    <Image
                      src={team.teamLogo}
                      alt={team.teamName || 'F1 Team'}
                      className="max-w-full max-h-full object-contain"
                      width={800}
                    />
                  )}
                </div>
              </motion.div>

              {/* Info Section */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col justify-center"
              >
                <h1 className="font-heading text-5xl md:text-6xl font-black text-white mb-6">
                  {team.teamName}
                </h1>

                {team.description && (
                  <p className="font-paragraph text-lg text-light-grey mb-8 leading-relaxed">
                    {team.description}
                  </p>
                )}

                <div className="space-y-6">
                  {team.baseLocation && (
                    <div className="flex items-start gap-4 bg-medium-grey p-6 rounded border border-light-grey border-opacity-10">
                      <div className="bg-accent-red bg-opacity-10 p-3 rounded">
                        <MapPin className="w-6 h-6 text-accent-red" />
                      </div>
                      <div>
                        <p className="font-paragraph text-sm text-light-grey mb-1">Base Location</p>
                        <p className="font-heading text-xl font-bold text-white">{team.baseLocation}</p>
                      </div>
                    </div>
                  )}

                  {team.teamPrincipal && (
                    <div className="flex items-start gap-4 bg-medium-grey p-6 rounded border border-light-grey border-opacity-10">
                      <div className="bg-accent-red bg-opacity-10 p-3 rounded">
                        <User className="w-6 h-6 text-accent-red" />
                      </div>
                      <div>
                        <p className="font-paragraph text-sm text-light-grey mb-1">Team Principal</p>
                        <p className="font-heading text-xl font-bold text-white">{team.teamPrincipal}</p>
                      </div>
                    </div>
                  )}

                  {team.championshipsWon !== undefined && (
                    <div className="flex items-start gap-4 bg-medium-grey p-6 rounded border border-light-grey border-opacity-10">
                      <div className="bg-accent-red bg-opacity-10 p-3 rounded">
                        <Trophy className="w-6 h-6 text-accent-red" />
                      </div>
                      <div>
                        <p className="font-paragraph text-sm text-light-grey mb-1">Championships Won</p>
                        <p className="font-heading text-xl font-bold text-white">{team.championshipsWon}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  {team.websiteUrl && (
                    <a href={team.websiteUrl} target="_blank" rel="noopener noreferrer">
                      <button className="bg-accent-red text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded hover:bg-opacity-90 transition-all duration-300 flex items-center gap-2">
                        Visit Website
                        <ExternalLink className="w-5 h-5" />
                      </button>
                    </a>
                  )}
                  <Link to="/teams">
                    <button className="bg-transparent text-accent-red border-2 border-accent-red font-paragraph font-semibold px-8 py-4 rounded hover:bg-accent-red hover:text-primary-foreground transition-all duration-300">
                      View All Teams
                    </button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
