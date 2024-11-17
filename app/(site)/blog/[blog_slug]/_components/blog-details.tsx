import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  Share2,
  Bookmark,
  Facebook,
  Twitter,
  Linkedin,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from "lucide-react";

export default function BlogDetails() {
  const post = {
    title: "The Future of Digital Transformation in Enterprise Solutions",
    subtitle:
      "A comprehensive analysis of emerging trends and strategic implementations",
    author: {
      name: "Dr. Sarah Mitchell",
      avatar: "https://github.com/shadcn.png",
      role: "Director of Digital Strategy",
      bio: "PhD in Computer Science with 15+ years of experience in enterprise digital transformation",
    },
    metadata: {
      publishedDate: "November 15, 2024",
      readTime: "8 min read",
      category: "Enterprise Technology",
      tags: ["Digital Transformation", "Enterprise", "Innovation", "Strategy"],
    },
    engagement: {
      views: "2.4k",
      comments: 28,
      shares: 156,
    },

    content: {
      introduction: `Digital transformation has become the cornerstone of modern enterprise evolution. As we move into 2024 and beyond, organizations face unprecedented opportunities and challenges in adapting to rapidly evolving technological landscapes. This comprehensive analysis delves into the latest trends, strategic approaches, and practical implementations that are reshaping the future of enterprise solutions.`,
      sections: [
        {
          id: "current-landscape",
          title: "The Current Digital Transformation Landscape",
          content: `The enterprise technology landscape has undergone significant changes in recent years, driven by several key factors:`,
          bullets: [
            "Accelerated adoption of cloud-native architectures",
            "Rising importance of data-driven decision making",
            "Increased focus on cybersecurity and compliance",
            "Growing demand for seamless digital experiences",
          ],
          subsection: {
            title: "Impact on Enterprise Architecture",
            content:
              "Modern enterprise architecture has evolved from traditional monolithic structures to more flexible, distributed systems. This shift has enabled organizations to:",
          },
        },
        {
          id: "key-trends",
          title: "Key Trends Shaping Enterprise Digital Transformation",
          content: `As organizations navigate the complexities of digital transformation, several pivotal trends have emerged as critical factors in successful implementations:`,
          keyPoints: [
            {
              title: "Hybrid Cloud Evolution",
              description:
                "Organizations are adopting sophisticated hybrid cloud strategies that combine the best of public and private cloud infrastructures. This approach offers enhanced flexibility, scalability, and cost optimization while maintaining security and compliance requirements.",
            },
            {
              title: "AI and Machine Learning Integration",
              description:
                "Artificial Intelligence and Machine Learning are no longer optional additions but core components of enterprise solutions. From automated decision-making to predictive analytics, AI is driving innovation across all business functions.",
            },
            {
              title: "Enhanced Cybersecurity Measures",
              description:
                "With the increasing sophistication of cyber threats, enterprises are implementing zero-trust architectures and advanced threat detection systems. This includes AI-powered security solutions and comprehensive risk management frameworks.",
            },
          ],
        },
        {
          id: "implementation-framework",
          title: "Strategic Implementation Framework",
          content: `A successful digital transformation strategy requires a well-structured approach that aligns technology initiatives with business objectives. Here's a comprehensive framework for implementation:`,
          steps: [
            {
              phase: "Assessment & Planning",
              details:
                "Evaluate current technological capabilities, identify gaps, and define clear transformation objectives.",
              keyConsiderations: [
                "Business goal alignment",
                "Resource availability",
                "Risk assessment",
                "Timeline planning",
              ],
            },
            {
              phase: "Technology Selection",
              details:
                "Choose appropriate technologies and platforms that align with organizational needs and objectives.",
              keyConsiderations: [
                "Scalability requirements",
                "Integration capabilities",
                "Total cost of ownership",
                "Future readiness",
              ],
            },
            {
              phase: "Implementation & Adoption",
              details:
                "Execute the transformation strategy while ensuring proper change management and stakeholder engagement.",
              keyConsiderations: [
                "Phased rollout approach",
                "Training and support",
                "Performance monitoring",
                "Feedback integration",
              ],
            },
          ],
        },
        {
          id: "challenges-solutions",
          title: "Common Challenges and Solutions",
          content: `Digital transformation initiatives often face several challenges. Here are practical solutions to common obstacles:`,
          challenges: [
            {
              challenge: "Resistance to Change",
              solution:
                "Implement comprehensive change management programs and focus on stakeholder engagement through clear communication and demonstrated value.",
            },
            {
              challenge: "Legacy System Integration",
              solution:
                "Adopt modern integration patterns and middleware solutions while maintaining critical legacy functions during the transition period.",
            },
            {
              challenge: "Skills Gap",
              solution:
                "Invest in training programs, leverage partnerships with technology providers, and consider managed services for specialized needs.",
            },
          ],
        },
      ],
      conclusion: {
        title: "Looking Ahead",
        content: `As we look to the future, digital transformation will continue to evolve and adapt to new technological capabilities and business requirements. Organizations that successfully navigate this transformation journey will be well-positioned to thrive in the digital economy.`,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="flex items-center space-x-2 mb-6">
            <Badge variant="secondary" className="text-xs font-medium">
              {post.metadata.category}
            </Badge>
            <span className="text-gray-400">•</span>
            <span className="text-sm text-gray-500">
              {post.metadata.readTime}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8">{post.subtitle}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-gray-900">
                  {post.author.name}
                </div>
                <div className="text-sm text-gray-500">{post.author.role}</div>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {post.metadata.publishedDate}
              </div>
              <div className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-2" />
                {post.engagement.comments} Comments
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-12 gap-8">
          {/* Article Content */}
          <div className="col-span-12 lg:col-span-8">
            <Card className="border-none shadow-none">
              <CardContent className="p-0">
                <div className="prose prose-gray max-w-none">
                  {/* Introduction */}
                  <p className="text-lg leading-relaxed text-gray-700 mb-8">
                    {post.content.introduction}
                  </p>

                  {/* Main Sections */}
                  {post.content.sections.map((section) => (
                    <div key={section.id} className="mb-12">
                      <h2
                        className="text-2xl font-bold text-gray-900 mb-4"
                        id={section.id}
                      >
                        {section.title}
                      </h2>

                      <p className="mb-6 text-gray-700">{section.content}</p>

                      {section.bullets && (
                        <ul className="list-disc pl-6 mb-6 space-y-2">
                          {section.bullets.map((bullet, index) => (
                            <li key={index} className="text-gray-700">
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}

                      {section.keyPoints && (
                        <div className="space-y-6">
                          {section.keyPoints.map((point, index) => (
                            <div
                              key={index}
                              className="bg-gray-50 p-6 rounded-lg"
                            >
                              <h3 className="text-lg font-semibold mb-2">
                                {point.title}
                              </h3>
                              <p className="text-gray-700">
                                {point.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {section.steps && (
                        <div className="space-y-6">
                          {section.steps.map((step, index) => (
                            <div
                              key={index}
                              className="border-l-4 border-primary pl-4"
                            >
                              <h3 className="text-lg font-semibold mb-2">
                                {step.phase}
                              </h3>
                              <p className="text-gray-700 mb-3">
                                {step.details}
                              </p>
                              <ul className="list-disc pl-6 space-y-1">
                                {step.keyConsiderations.map((item, idx) => (
                                  <li
                                    key={idx}
                                    className="text-gray-600 text-sm"
                                  >
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}

                      {section.challenges && (
                        <div className="space-y-6">
                          {section.challenges.map((item, index) => (
                            <div
                              key={index}
                              className="bg-gray-50 p-6 rounded-lg"
                            >
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {item.challenge}
                              </h3>
                              <p className="text-gray-700">{item.solution}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Conclusion */}
                  <div className="bg-primary/5 p-6 rounded-lg mt-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      {post.content.conclusion.title}
                    </h2>
                    <p className="text-gray-700">
                      {post.content.conclusion.content}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tags Section */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-500 mb-3">
                Related Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.metadata.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Author Bio */}
            <Card className="mt-8 bg-gray-50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">About the Author</h3>
                <p className="text-gray-600 text-sm">{post.author.bio}</p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4">
            <div className="sticky top-6 space-y-6">
              {/* Share Widget */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">
                    Share this article
                  </h3>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Twitter className="w-4 h-4 mr-2" />
                      Twitter
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Table of Contents */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">
                    Contents
                  </h3>
                  <nav className="space-y-2">
                    <a
                      href="#"
                      className="block text-sm text-gray-600 hover:text-primary"
                    >
                      Introduction
                    </a>
                    <a
                      href="#"
                      className="block text-sm text-gray-600 hover:text-primary"
                    >
                      Key Trends
                    </a>
                    <a
                      href="#"
                      className="block text-sm text-gray-600 hover:text-primary"
                    >
                      Strategic Framework
                    </a>
                    <a
                      href="#"
                      className="block text-sm text-gray-600 hover:text-primary"
                    >
                      Implementation Guide
                    </a>
                  </nav>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <Separator className="my-8" />
        <div className="flex justify-between items-center">
          <Button variant="ghost" className="flex items-center space-x-2">
            <ChevronLeft className="w-4 h-4" />
            <div className="text-left">
              <div className="text-xs text-gray-500">Previous Article</div>
              <div className="text-sm font-medium">
                Cloud Migration Strategies
              </div>
            </div>
          </Button>

          <Button variant="ghost" className="flex items-center space-x-2">
            <div className="text-right">
              <div className="text-xs text-gray-500">Next Article</div>
              <div className="text-sm font-medium">AI in Enterprise</div>
            </div>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
