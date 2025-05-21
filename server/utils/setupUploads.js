const setupUploads = (fs, path, __dirname) => {
  const uploadDir = path.join(__dirname, 'uploads')
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, {recursive: true})
  }
}

export default setupUploads
