"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, Phone, Send } from "lucide-react"

function ContactHeader() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />

      {/* Animated elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/10 blur-xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-secondary/10 blur-xl animate-float-slow" />

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            delay: 0.2,
          }}
          className="bg-primary/20 backdrop-blur-sm p-6 rounded-full mb-4 inline-block"
        >
          <Mail className="h-12 w-12 text-primary" />
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-bold gradient-text"
        >
          GET IN TOUCH
        </motion.h3>
      </div>
    </div>
  )
}

export default function Contact() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section id="contact" className="section bg-gradient-to-b from-background to-background/50" ref={containerRef}>
      <motion.div className="section-content" style={{ opacity }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Contact Me</h2>
            <p className="text-lg text-muted-foreground mb-6">Get in touch for opportunities or collaborations</p>

            <div className="h-[300px] rounded-lg overflow-hidden bg-secondary/10 backdrop-blur-sm border border-primary/20 mb-8">
              <ContactHeader />
            </div>

            <Card className="bg-secondary/30 backdrop-blur-sm border-primary/20">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">akshatbvora@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">+91 8850490510</p>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <p className="font-medium">Connect with me</p>
                  <div className="flex gap-4">
                    <Button variant="outline" size="icon" className="border-primary/20 hover:bg-primary/20">
                      <Github className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="border-primary/20 hover:bg-primary/20">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-secondary/30 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>Feel free to reach out!</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Input type="text" placeholder="Your Name" />
                </div>
                <div className="grid gap-2">
                  <Input type="email" placeholder="Your Email" />
                </div>
                <div className="grid gap-2">
                  <Textarea placeholder="Your Message" className="resize-none" />
                </div>
                <Button className="w-full">
                  Send Message
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
