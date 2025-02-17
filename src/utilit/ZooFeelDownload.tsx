const handleDownload = () => {
    const fileUrl = "/android/ZooFeel.apk"; 
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "ZooFeel.apk";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  export default handleDownload;
  