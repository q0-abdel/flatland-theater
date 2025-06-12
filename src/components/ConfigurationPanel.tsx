
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SimulationConfig } from '../types/theater';

interface ConfigurationPanelProps {
  onStart: (config: SimulationConfig) => void;
  initialConfig: SimulationConfig;
}

const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({ onStart, initialConfig }) => {
  const [lineLength, setLineLength] = useState(initialConfig.lineLength);
  const [actionInterval, setActionInterval] = useState(initialConfig.actionInterval / 1000);

  const handleStart = () => {
    const config: SimulationConfig = {
      lineLength: Math.max(5, lineLength),
      actionInterval: Math.max(0.1, actionInterval) * 1000,
    };
    onStart(config);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
            Fatland Theater
          </h1>
          <p className="text-2xl text-gray-300 mb-2">
            3D Digital Simulation of Theatrical Improvisation
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Experience "Story on a Line" - an autonomous performance where three realistic characters 
            create emergent dramaturgy through simple actions on a theatrical stage.
          </p>
        </div>

        {/* Configuration Card */}
        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-white">Simulation Configuration</CardTitle>
            <CardDescription className="text-gray-400 text-lg">
              Set the parameters for your theatrical simulation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="lineLength" className="text-lg font-medium text-white">
                  Movement Line Length
                </Label>
                <Input
                  id="lineLength"
                  type="number"
                  min="5"
                  max="20"
                  value={lineLength}
                  onChange={(e) => setLineLength(parseInt(e.target.value) || 10)}
                  className="text-lg h-12 bg-gray-700 border-gray-600 text-white"
                />
                <p className="text-sm text-gray-400">
                  Number of discrete units on the movement line (minimum 5 for three characters)
                </p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="actionInterval" className="text-lg font-medium text-white">
                  Action Interval (seconds)
                </Label>
                <Input
                  id="actionInterval"
                  type="number"
                  min="0.1"
                  max="5"
                  step="0.1"
                  value={actionInterval}
                  onChange={(e) => setActionInterval(parseFloat(e.target.value) || 1)}
                  className="text-lg h-12 bg-gray-700 border-gray-600 text-white"
                />
                <p className="text-sm text-gray-400">
                  Time between each character decision/action
                </p>
              </div>
            </div>

            <div className="pt-6">
              <Button
                onClick={handleStart}
                className="w-full h-14 text-xl font-semibold bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 transition-all duration-300"
              >
                Begin Simulation
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Feature Description */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gray-800/30 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">High Realism</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Characters with Sims-level detail, realistic animations, and expressive interactions.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/30 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Autonomous Behavior</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Watch emergent stories unfold as characters make independent decisions within strict rules.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/30 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Theatrical Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Experience the magic of improvisation in a beautifully lit 3D theater environment.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationPanel;
