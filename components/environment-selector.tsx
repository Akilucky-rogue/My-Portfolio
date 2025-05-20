"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useEnvironment, type EnvironmentPresetType } from "@/contexts/environment-context"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sun, Moon, MapIcon as City, TreesIcon as Tree, Palette, RotateCcw, Layers, Eye } from "lucide-react"

export function EnvironmentSelector() {
  const { environments, currentEnvironment, setEnvironment, updateEnvironmentSetting } = useEnvironment()
  const [isOpen, setIsOpen] = useState(false)

  // Group environments by type
  const groupedEnvironments = environments.reduce(
    (acc, env) => {
      if (!acc[env.type]) {
        acc[env.type] = []
      }
      acc[env.type].push(env)
      return acc
    },
    {} as Record<EnvironmentPresetType, typeof environments>,
  )

  // Get icon for environment type
  const getTypeIcon = (type: EnvironmentPresetType) => {
    switch (type) {
      case "studio":
        return <Sun className="h-4 w-4" />
      case "natural":
        return <Tree className="h-4 w-4" />
      case "urban":
        return <City className="h-4 w-4" />
      case "abstract":
        return <Palette className="h-4 w-4" />
      case "custom":
        return <Layers className="h-4 w-4" />
      default:
        return <Sun className="h-4 w-4" />
    }
  }

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-background/80 backdrop-blur-sm"
      >
        {isOpen ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
        {isOpen ? "Close" : "Environment"}
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20, height: 0 }}
        animate={isOpen ? { opacity: 1, y: 0, height: "auto" } : { opacity: 0, y: 20, height: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <Card className="mt-2 w-80 bg-background/80 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Environment Settings</CardTitle>
            <CardDescription>Customize the 3D environment</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="studio">
              <TabsList className="grid grid-cols-5 mb-4">
                {Object.keys(groupedEnvironments).map((type) => (
                  <TabsTrigger key={type} value={type}>
                    {getTypeIcon(type as EnvironmentPresetType)}
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(groupedEnvironments).map(([type, envs]) => (
                <TabsContent key={type} value={type} className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    {envs.map((env) => (
                      <Button
                        key={env.name}
                        variant={currentEnvironment.name === env.name ? "default" : "outline"}
                        size="sm"
                        onClick={() => setEnvironment(env)}
                        className="justify-start"
                      >
                        <span className="truncate">{env.name}</span>
                      </Button>
                    ))}
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-sm font-medium">Intensity</label>
                        <span className="text-xs text-muted-foreground">
                          {currentEnvironment.intensity?.toFixed(1)}
                        </span>
                      </div>
                      <Slider
                        value={[currentEnvironment.intensity || 1]}
                        min={0}
                        max={2}
                        step={0.1}
                        onValueChange={(value) => updateEnvironmentSetting({ intensity: value[0] })}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-sm font-medium">Blur</label>
                        <span className="text-xs text-muted-foreground">{currentEnvironment.blur?.toFixed(1)}</span>
                      </div>
                      <Slider
                        value={[currentEnvironment.blur || 0.4]}
                        min={0}
                        max={1}
                        step={0.1}
                        onValueChange={(value) => updateEnvironmentSetting({ blur: value[0] })}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-sm font-medium">Rotation</label>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5"
                          onClick={() => updateEnvironmentSetting({ rotation: 0 })}
                        >
                          <RotateCcw className="h-3 w-3" />
                        </Button>
                      </div>
                      <Slider
                        value={[currentEnvironment.rotation || 0]}
                        min={-1}
                        max={1}
                        step={0.1}
                        onValueChange={(value) => updateEnvironmentSetting({ rotation: value[0] })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Eye className="h-4 w-4" />
                        <label className="text-sm font-medium">Show Background</label>
                      </div>
                      <Switch
                        checked={currentEnvironment.background || false}
                        onCheckedChange={(checked) => updateEnvironmentSetting({ background: checked })}
                      />
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
