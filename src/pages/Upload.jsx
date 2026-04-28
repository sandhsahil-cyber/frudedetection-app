import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload as UploadIcon, FileSpreadsheet, FileImage, Camera, CheckCircle, MapPin } from 'lucide-react';
import './Upload.css';

const Upload = () => {
  const navigate = useNavigate();
  const [tallyFile, setTallyFile] = useState(null);
  const [scannedFiles, setScannedFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState('');
  const videoRef = useRef(null);

  const handleTallyUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setTallyFile(e.target.files[0]);
    }
  };

  const handleScannedUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setScannedFiles(Array.from(e.target.files));
    }
  };

  const simulateCameraScan = () => {
    setIsCameraActive(true);
    // Simulate camera starting and taking a photo after 3 seconds
    setTimeout(() => {
      const mockFile = new File(["dummy content"], `scanned_doc_${Date.now()}.jpg`, { type: "image/jpeg" });
      setScannedFiles(prev => [...prev, mockFile]);
      setIsCameraActive(false);
    }, 3000);
  };

  const startProcessing = () => {
    if (!selectedOutlet) {
      alert("Please select a dealership outlet first.");
      return;
    }
    if (!tallyFile && scannedFiles.length === 0) return;
    
    setIsProcessing(true);
    let currentProgress = 0;
    
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress >= 100) {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          navigate('/results');
        }, 500);
      } else {
        setProgress(currentProgress);
      }
    }, 400);
  };

  if (isProcessing) {
    return (
      <div className="processing-container">
        <div className="processing-card">
          <h2>Analyzing Documents</h2>
          <p>Cross-referencing Tally data with scanned invoices...</p>
          
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="progress-text">{Math.round(progress)}% Complete</p>
          
          <ul className="processing-steps">
            <li className={progress > 20 ? 'completed' : ''}>
              <CheckCircle size={16} /> Extracted Tally Data
            </li>
            <li className={progress > 50 ? 'completed' : ''}>
              <CheckCircle size={16} /> Performing OCR on Scans
            </li>
            <li className={progress > 80 ? 'completed' : ''}>
              <CheckCircle size={16} /> Matching Algorithms Running
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="upload-page">
      <div className="page-header">
        <h1>Upload Documents</h1>
        <p>Upload your Tally export and corresponding invoice scans for verification.</p>
      </div>

      <div className="card outlet-selector-container">
        <div className="outlet-selector-header">
          <MapPin size={20} className="text-secondary" />
          <label htmlFor="outlet-select">Select Dealership Outlet</label>
        </div>
        <select 
          id="outlet-select" 
          className="outlet-select"
          value={selectedOutlet}
          onChange={(e) => setSelectedOutlet(e.target.value)}
        >
          <option value="" disabled>Choose an outlet...</option>
          <option value="tata-rajkot">TATA Motors - Rajkot</option>
          <option value="tata-delhi">TATA Motors - Delhi South</option>
          <option value="mg-ahmedabad">MG Motors - Ahmedabad</option>
          <option value="toyota-surat">Toyota - Surat</option>
          <option value="hyundai-mumbai">Hyundai - Mumbai West</option>
        </select>
      </div>

      <div className="upload-grid">
        <div className="card upload-section">
          <div className="section-header">
            <div className="icon-badge blue">
              <FileSpreadsheet size={24} />
            </div>
            <h2>Section A: Tally Export</h2>
            <p>Upload Excel (.xlsx) or CSV export from Tally</p>
          </div>
          
          <div className="drop-zone">
            <UploadIcon size={32} className="drop-icon" />
            <p>Drag and drop your file here, or click to browse</p>
            <input type="file" accept=".xlsx,.xls,.csv" onChange={handleTallyUpload} className="file-input" />
          </div>
          {tallyFile && (
            <div className="file-preview">
              <FileSpreadsheet size={20} />
              <span>{tallyFile.name}</span>
            </div>
          )}
        </div>

        <div className="card upload-section">
          <div className="section-header">
            <div className="icon-badge blue">
              <FileImage size={24} />
            </div>
            <h2>Section B: Scanned Documents</h2>
            <p>Upload or scan JPG/PDF invoices</p>
          </div>
          
          <div className="drop-zone">
            <UploadIcon size={32} className="drop-icon" />
            <p>Drag and drop multiple files here, or click to browse</p>
            <input type="file" accept="image/*,.pdf" multiple onChange={handleScannedUpload} className="file-input" />
          </div>

          <div className="camera-section">
            <div className="divider"><span>OR</span></div>
            <button 
              className={`btn-primary camera-btn ${isCameraActive ? 'scanning' : ''}`} 
              onClick={simulateCameraScan}
              disabled={isCameraActive}
            >
              <Camera size={20} />
              {isCameraActive ? 'Scanning Document...' : 'Use Mobile Camera Scan'}
            </button>
            {isCameraActive && (
              <div className="camera-viewfinder">
                <div className="scan-line"></div>
                <p>Position document in frame...</p>
              </div>
            )}
          </div>

          {scannedFiles.length > 0 && (
            <div className="file-preview-list">
              {scannedFiles.map((file, idx) => (
                <div key={idx} className="file-preview">
                  <FileImage size={20} />
                  <span>{file.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="upload-actions">
        <button 
          className="btn-primary process-btn" 
          onClick={startProcessing}
          disabled={!tallyFile && scannedFiles.length === 0}
        >
          Start Fraud Analysis
        </button>
      </div>
    </div>
  );
};

export default Upload;
