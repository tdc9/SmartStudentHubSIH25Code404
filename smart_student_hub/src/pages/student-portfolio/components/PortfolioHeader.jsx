import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PortfolioHeader = ({ 
  studentName, 
  onDownloadPDF, 
  onGenerateLink, 
  onTogglePrivacy, 
  isPrivate = false,
  onCustomizeTheme 
}) => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [shareableLink, setShareableLink] = useState('');
  const [showLinkModal, setShowLinkModal] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      await onDownloadPDF();
      // Simulate PDF generation
      setTimeout(() => {
        setIsGeneratingPDF(false);
      }, 2000);
    } catch (error) {
      setIsGeneratingPDF(false);
    }
  };

  const handleGenerateLink = async () => {
    setIsGeneratingLink(true);
    try {
      const link = `https://smartstudenthub.com/portfolio/${studentName?.toLowerCase()?.replace(/\s+/g, '-')}-${Date.now()}`;
      setShareableLink(link);
      setShowLinkModal(true);
      onGenerateLink(link);
    } catch (error) {
      console.error('Error generating link:', error);
    } finally {
      setIsGeneratingLink(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard?.writeText(shareableLink);
    // You could add a toast notification here
  };

  return (
    <>
      <div className="bg-card border border-border rounded-2xl p-6 mb-6 card-shadow">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={32} color="var(--color-primary-foreground)" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{studentName}'s Portfolio</h1>
              <p className="text-muted-foreground">Computer Science Engineering • Class of 2024</p>
              <div className="flex items-center gap-2 mt-1">
                <div className={`w-2 h-2 rounded-full ${isPrivate ? 'bg-warning' : 'bg-success'}`} />
                <span className="text-sm text-muted-foreground">
                  {isPrivate ? 'Private Portfolio' : 'Public Portfolio'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              onClick={onCustomizeTheme}
              iconName="Palette"
              iconPosition="left"
              size="sm"
            >
              Customize
            </Button>

            <Button
              variant="outline"
              onClick={onTogglePrivacy}
              iconName={isPrivate ? "Eye" : "EyeOff"}
              iconPosition="left"
              size="sm"
            >
              {isPrivate ? 'Make Public' : 'Make Private'}
            </Button>

            <Button
              variant="outline"
              onClick={handleGenerateLink}
              loading={isGeneratingLink}
              iconName="Share2"
              iconPosition="left"
              size="sm"
            >
              Share Link
            </Button>

            <Button
              variant="default"
              onClick={handleDownloadPDF}
              loading={isGeneratingPDF}
              iconName="Download"
              iconPosition="left"
              size="sm"
            >
              Download PDF
            </Button>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Icon name="Calendar" size={16} className="text-muted-foreground" />
              <span className="text-muted-foreground">Last Updated:</span>
              <span className="text-foreground font-medium">Dec 10, 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Eye" size={16} className="text-muted-foreground" />
              <span className="text-muted-foreground">Profile Views:</span>
              <span className="text-foreground font-medium">127</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Award" size={16} className="text-muted-foreground" />
              <span className="text-muted-foreground">Completion:</span>
              <span className="text-success font-medium">92%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Share Link Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Shareable Link Generated</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowLinkModal(false)}
                iconName="X"
                iconSize={20}
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Portfolio Link</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={shareableLink}
                    readOnly
                    className="flex-1 bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyToClipboard}
                    iconName="Copy"
                    iconSize={16}
                  />
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p>• Link expires in 30 days</p>
                <p>• Viewers can see public sections only</p>
                <p>• Access tracking is enabled</p>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowLinkModal(false)}>
                  Close
                </Button>
                <Button onClick={copyToClipboard}>
                  Copy Link
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PortfolioHeader;