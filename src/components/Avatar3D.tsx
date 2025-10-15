import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { Star, Heart, Zap, Trophy } from 'lucide-react';

interface Avatar3DProps {
  level: number;
  health: number;
  energy: number;
  experience: number;
}

export function Avatar3D({ level, health, energy, experience }: Avatar3DProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 2000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Avatar appearance based on health stats
  const getAvatarColor = () => {
    if (health >= 80) return '#22c55e'; // Green - Excellent health
    if (health >= 60) return '#3b82f6'; // Blue - Good health
    if (health >= 40) return '#f59e0b'; // Orange - Fair health
    return '#ef4444'; // Red - Needs improvement
  };

  const getAvatarSize = () => {
    return Math.max(100, Math.min(140, 100 + (health / 10)));
  };

  return (
    <div className="relative">
      <Card className="gaming-card p-8 text-center border-0">
        {/* Avatar Container */}
        <div className="relative inline-block mb-6">
          {/* Avatar Background Glow */}
          <div 
            className="absolute inset-0 rounded-full opacity-30 blur-xl"
            style={{
              background: `radial-gradient(circle, ${getAvatarColor()}, transparent)`,
              width: getAvatarSize() + 40,
              height: getAvatarSize() + 40,
              left: -20,
              top: -20
            }}
          />
          
          {/* Main Avatar */}
          <motion.div
            className="relative z-10 rounded-full border-4 border-white shadow-2xl"
            style={{
              width: getAvatarSize(),
              height: getAvatarSize(),
              background: `linear-gradient(135deg, ${getAvatarColor()}, ${getAvatarColor()}dd)`
            }}
            animate={isAnimating ? {
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            } : {}}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            {/* Avatar Face */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="text-white"
                animate={isAnimating ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                {health >= 80 ? '😊' : health >= 60 ? '🙂' : health >= 40 ? '😐' : '😔'}
              </motion.div>
            </div>

            {/* Level Badge */}
            <div className="absolute -top-2 -right-2">
              <Badge className="bg-blue-primary text-white px-2 py-1 rounded-full border-2 border-white">
                <Star className="h-3 w-3 mr-1" />
                {level}
              </Badge>
            </div>

            {/* Achievement Particles */}
            {isAnimating && (
              <>
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                    initial={{
                      x: getAvatarSize() / 2,
                      y: getAvatarSize() / 2,
                      scale: 0
                    }}
                    animate={{
                      x: getAvatarSize() / 2 + (Math.cos(i * 60 * Math.PI / 180) * 60),
                      y: getAvatarSize() / 2 + (Math.sin(i * 60 * Math.PI / 180) * 60),
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.1,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </>
            )}
          </motion.div>
        </div>

        {/* Stats */}
        <div className="space-y-4">
          <h3 className="text-blue-primary">Mi Avatar</h3>
          
          <div className="grid grid-cols-3 gap-4">
            {/* Health */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-red-100 rounded-lg mb-2">
                <Heart className="h-5 w-5 text-red-500" />
              </div>
              <p className="text-xs text-gray-medium">Salud</p>
              <p className="text-blue-primary">{health}%</p>
            </div>

            {/* Energy */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg mb-2">
                <Zap className="h-5 w-5 text-yellow-500" />
              </div>
              <p className="text-xs text-gray-medium">Energía</p>
              <p className="text-blue-primary">{energy}%</p>
            </div>

            {/* Experience */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg mb-2">
                <Trophy className="h-5 w-5 text-purple-500" />
              </div>
              <p className="text-xs text-gray-medium">EXP</p>
              <p className="text-blue-primary">{experience}</p>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="space-y-3 pt-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-medium">Salud</span>
                <span className="text-xs text-blue-primary">{health}/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-red-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${health}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-medium">Energía</span>
                <span className="text-xs text-blue-primary">{energy}/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-yellow-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${energy}%` }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-medium">Progreso al Nivel {level + 1}</span>
                <span className="text-xs text-blue-primary">{experience % 100}/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-purple-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${experience % 100}%` }}
                  transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}