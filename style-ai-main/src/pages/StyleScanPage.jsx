import { useState, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Upload, Camera, RefreshCw, Sparkles, Save, ShoppingBag, Shield, Info, X } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';
import { products, staticRecommendations } from '@/data/products';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { analyzeSkinApi } from "@/lib/skinApi";
import { colorPalettes } from "@/data/colorPalettes";
import { generatePalette } from "../utils/autoColorEngine";

// Simulated AI analysis results

export default function StyleScanPage() {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [hasConsented, setHasConsented] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false); // New state

    const fileInputRef = useRef(null);
    const videoRef = useRef(null); // New ref
    const canvasRef = useRef(null); // New ref
    const { addSavedStyle, user } = useStore();
    const navigate = useNavigate();

    const startCamera = async () => {
        if (!user) {
            toast.error("Please log in to use Style Scan");
            navigate('/register');
            return;
        }

        setIsCameraOpen(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Error accessing camera:", err);
            toast.error("Could not access camera. Please allow permissions.");
            setIsCameraOpen(false);
        }
    };

    const stopCamera = () => {
        setIsCameraOpen(false);
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
    };

    const captureImage = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            canvas.toBlob((blob) => {
                const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
                setImageFile(file);
                setUploadedImage(URL.createObjectURL(blob));
                stopCamera();
            }, 'image/jpeg');
        }
    };

    const handleProtectedAction = (action) => {
        if (!user) {
            toast.error("Please log in to use Style Scan");
            navigate('/register');
            return;
        }
        action();
    };

    const handleFileUpload = useCallback((e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please upload an image file");
            return;
        }

        setImageFile(file); // ✅ THIS IS STEP 3 (REAL FILE)

        const reader = new FileReader();
        reader.onload = (event) => {
            setUploadedImage(event.target?.result); // preview only
            setAnalysisResult(null);
        };
        reader.readAsDataURL(file);
    }, []);


    const handleDrop = useCallback((e) => {
        e.preventDefault();

        if (!user) {
            toast.error("Please log in to use Style Scan");
            navigate('/register');
            return;
        }

        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            setImageFile(file); // ✅ REAL FILE

            const reader = new FileReader();
            reader.onload = (event) => {
                setUploadedImage(event.target?.result);
                setAnalysisResult(null);
            };
            reader.readAsDataURL(file);
        }
    }, []);


    const handleAnalyze = async () => {
        if (!imageFile || !hasConsented) return;

        setIsAnalyzing(true);

        try {
            const data = await analyzeSkinApi(imageFile);

            const skinTone = data.skinTone || "Medium";
            const undertone = data.undertone || "warm";

            // ✅ THIS IS THE FIX
            const palette = generatePalette(skinTone, undertone);

            setAnalysisResult({
                skinTone,
                undertone,
                colorPalette: palette,
                recommendations: products.filter(p =>
                    p.colors && p.colors.some(c => palette.some(pc => pc.id === c))
                ).slice(0, 4),
            });
            toast.success("Analysis complete!");
        } catch (error) {
            const errType = error?.response?.data?.errorType;

            if (errType === "NO_FACE") {
                toast.error("No face detected. Please upload a clear face photo.");
            } else if (errType === "FULL_BODY") {
                toast.error("Please upload only a face photo (no full body).");
            } else if (errType === "INVALID_IMAGE") {
                toast.error("Invalid image file.");
            } else {
                toast.error("Skin analysis failed. Try another image.");
            }

            console.error("Skin scan error:", error);
        } finally {
            setIsAnalyzing(false);
        }
    };


    const handleSaveStyle = () => {
        if (!analysisResult) return;

        const newStyle = {
            id: Date.now().toString(),
            name: `My Style ${new Date().toLocaleDateString()}`,
            createdAt: new Date(),
            skinTone: analysisResult.skinTone,
            undertone: analysisResult.undertone,
            colorPalette: analysisResult.colorPalette,
            recommendedProducts: analysisResult.recommendations,
        };

        addSavedStyle(newStyle);
        toast.success('Style saved to your profile!');
    };

    const handleRetake = () => {
        setUploadedImage(null);
        setAnalysisResult(null);
        setHasConsented(false);
    };

    return (
        <div className="min-h-screen">
            <Header />

            <main className="pt-24 pb-20">
                <div className="container max-w-4xl">
                    {/* Page Header */}
                    <div className="text-center mb-12">
                        <span className="text-small text-accent mb-4 block">AI-Powered</span>
                        <h1 className="text-section mb-4">Style Scan</h1>
                        <p className="text-body max-w-xl mx-auto">
                            Upload a photo of yourself and let our AI analyze your skin tone,
                            undertone, and recommend colors that complement your unique features.
                        </p>
                    </div>

                    {!analysisResult ? (
                        <>
                            {/* Upload Area */}
                            <div
                                onDrop={handleDrop}
                                onDragOver={(e) => e.preventDefault()}
                                className={cn(
                                    'relative rounded-2xl border-2 border-dashed transition-all duration-300 mb-8',
                                    uploadedImage
                                        ? 'border-accent bg-accent/5'
                                        : 'border-border hover:border-accent/50 hover:bg-secondary/50'
                                )}
                            >
                                {uploadedImage ? (
                                    <div className="p-8 flex flex-col md:flex-row items-center gap-8">
                                        <div className="w-48 h-48 rounded-xl overflow-hidden bg-secondary shrink-0">
                                            <img
                                                src={uploadedImage}
                                                alt="Uploaded preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 text-center md:text-left">
                                            <h3 className="font-display text-xl mb-2">Photo Ready</h3>
                                            <p className="text-muted-foreground mb-4">
                                                Your photo has been uploaded successfully. Review the privacy notice
                                                and click "Analyze My Style" to begin.
                                            </p>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => fileInputRef.current?.click()}
                                            >
                                                Change Photo
                                            </Button>
                                        </div>
                                    </div>
                                ) : isCameraOpen ? (
                                    <div className="relative rounded-2xl overflow-hidden bg-black flex flex-col items-center justify-center min-h-[400px]">
                                        <video
                                            ref={videoRef}
                                            autoPlay
                                            playsInline
                                            className="w-full h-full object-cover absolute inset-0 transform scale-x-[-1]"
                                        />
                                        <canvas ref={canvasRef} className="hidden" />

                                        <div className="absolute bottom-6 flex gap-4 z-10">
                                            <Button
                                                onClick={captureImage}
                                                className="rounded-full h-14 w-14 bg-white hover:bg-white/90 p-0 border-4 border-accent flex items-center justify-center shadow-lg"
                                            >
                                                <div className="h-10 w-10 rounded-full bg-accent" />
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                size="icon"
                                                className="rounded-full h-10 w-10 absolute -right-16 top-2"
                                                onClick={stopCamera}
                                            >
                                                <X className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-12 md:p-20 text-center">
                                        <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                                            <Upload className="h-8 w-8 text-accent" />
                                        </div>
                                        <h3 className="font-display text-xl mb-2">Upload Your Photo</h3>
                                        <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                                            Drag and drop an image here, or click to select from your device
                                        </p>
                                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                            <Button
                                                onClick={() => handleProtectedAction(() => fileInputRef.current?.click())}
                                                className="btn-primary gap-2"
                                            >
                                                <Upload className="h-4 w-4" />
                                                Choose File
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="gap-2"
                                                onClick={() => handleProtectedAction(startCamera)}
                                            >
                                                <Camera className="h-4 w-4" />
                                                Use Camera
                                            </Button>
                                        </div>
                                    </div>
                                )}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                />
                            </div>

                            {/* Privacy Consent */}
                            {uploadedImage && (
                                <div className="rounded-xl bg-secondary/50 p-6 mb-8">
                                    <div className="flex items-start gap-4">
                                        <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                                            <Shield className="h-5 w-5 text-accent" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-display text-lg mb-2">Privacy Notice</h4>
                                            <p className="text-sm text-muted-foreground mb-4">
                                                Your photo will be processed securely using our AI technology.
                                                We do not store your images on our servers after analysis.
                                                Your data is encrypted and never shared with third parties.
                                            </p>
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={hasConsented}
                                                    onChange={(e) => setHasConsented(e.target.checked)}
                                                    className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
                                                />
                                                <span className="text-sm">
                                                    I understand and agree to the privacy terms
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Analyze Button */}
                            {uploadedImage && (
                                <div className="text-center">
                                    <Button
                                        size="lg"
                                        className="btn-gold gap-2"
                                        onClick={handleAnalyze}
                                        disabled={!hasConsented || isAnalyzing}
                                    >
                                        {isAnalyzing ? (
                                            <>
                                                <RefreshCw className="h-5 w-5 animate-spin" />
                                                Analyzing...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="h-5 w-5" />
                                                Analyze My Style
                                            </>
                                        )}
                                    </Button>
                                </div>
                            )}
                        </>
                    ) : (
                        /* Analysis Results */
                        <div className="space-y-12">
                            {/* Results Summary */}
                            <div className="card-elevated p-8 md:p-10">
                                <div className="flex flex-col md:flex-row gap-8">
                                    <div className="w-32 h-32 rounded-xl overflow-hidden bg-secondary shrink-0 mx-auto md:mx-0">
                                        <img
                                            src={uploadedImage}
                                            alt="Your photo"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="flex-1 text-center md:text-left">
                                        <span className="text-small text-accent mb-2 block">Your Analysis</span>
                                        <h2 className="text-section mb-4">Style Profile</h2>

                                        <div className="grid grid-cols-2 gap-6 mb-6">
                                            <div>
                                                <p className="text-small mb-1">Skin Tone</p>
                                                <p className="font-display text-lg">{analysisResult.skinTone}</p>
                                            </div>
                                            <div>
                                                <p className="text-small mb-1">Undertone</p>
                                                <p className="font-display text-lg capitalize">{analysisResult.undertone}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-3">
                                            <Button onClick={handleSaveStyle} className="gap-2">
                                                <Save className="h-4 w-4" />
                                                Save Style
                                            </Button>
                                            <Button variant="outline" onClick={handleRetake} className="gap-2">
                                                <RefreshCw className="h-4 w-4" />
                                                Retake Scan
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Color Palette */}
                            <div>
                                <div className="text-center mb-8">
                                    <span className="text-small text-accent mb-2 block">Your Perfect Colors</span>
                                    <h3 className="text-section">Recommended Palette</h3>
                                </div>

                                <div className="flex overflow-x-auto pb-6 gap-4 justify-start md:justify-center px-4 scrollbar-hide">
                                    {analysisResult.colorPalette.map((color, index) => (
                                        <div key={index} className="text-center shrink-0">
                                            <div
                                                className="h-20 w-20 rounded-full border-4 border-background shadow-card mb-2"
                                                style={{ backgroundColor: color.hex }}
                                            />
                                            <span className="text-xs text-muted-foreground uppercase tracking-wide">
                                                {color.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                            </div>

                            {/* Recommended Products */}
                            <div>
                                <div className="flex items-end justify-between mb-8">
                                    <div>
                                        <span className="text-small text-accent mb-2 block">Curated For You</span>
                                        <h3 className="text-section">Recommended Products</h3>
                                    </div>
                                    <Link
                                        to="/collections"
                                        className="hidden md:flex items-center gap-2 text-sm font-medium underline-gold"
                                    >
                                        <ShoppingBag className="h-4 w-4" />
                                        Shop All
                                    </Link>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                                    {analysisResult.recommendations.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
