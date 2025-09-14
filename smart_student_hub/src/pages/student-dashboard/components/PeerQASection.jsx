import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PeerQASection = () => {
  const questions = [
    {
      id: 1,
      title: "How to optimize React component performance?",
      author: "Alex Kumar",
      tags: ["React", "Performance", "JavaScript"],
      answers: 12,
      views: 245,
      votes: 18,
      timeAgo: "2 hours ago",
      trending: true
    },
    {
      id: 2,
      title: "Best practices for database design in large applications?",
      author: "Priya Sharma",
      tags: ["Database", "SQL", "Architecture"],
      answers: 8,
      views: 156,
      votes: 14,
      timeAgo: "5 hours ago",
      trending: false
    },
    {
      id: 3,
      title: "Machine Learning model deployment strategies",
      author: "Rahul Patel",
      tags: ["ML", "Deployment", "Python"],
      answers: 6,
      views: 89,
      votes: 11,
      timeAgo: "1 day ago",
      trending: true
    }
  ];

  const myParticipation = {
    questionsAsked: 5,
    answersGiven: 12,
    reputation: 156
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Peer Q&A</h2>
        <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
          Ask Question
        </Button>
      </div>
      {/* Participation Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-muted/20 rounded-xl">
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">{myParticipation?.questionsAsked}</div>
          <div className="text-xs text-muted-foreground">Questions</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">{myParticipation?.answersGiven}</div>
          <div className="text-xs text-muted-foreground">Answers</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-accent">{myParticipation?.reputation}</div>
          <div className="text-xs text-muted-foreground">Reputation</div>
        </div>
      </div>
      {/* Recent Questions */}
      <div className="space-y-4 mb-6">
        {questions?.map((question) => (
          <div key={question?.id} className="p-4 border border-border rounded-xl hover:border-accent/20 transition-colors cursor-pointer">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-medium text-foreground text-sm leading-tight">{question?.title}</h3>
                  {question?.trending && (
                    <Icon name="TrendingUp" size={14} className="text-accent" />
                  )}
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-muted-foreground">by {question?.author}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{question?.timeAgo}</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {question?.tags?.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Icon name="MessageSquare" size={12} />
                    <span>{question?.answers} answers</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Eye" size={12} />
                    <span>{question?.views} views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="ArrowUp" size={12} />
                    <span>{question?.votes} votes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button variant="ghost" fullWidth iconName="ArrowRight" iconPosition="right">
        Browse All Questions
      </Button>
    </div>
  );
};

export default PeerQASection;