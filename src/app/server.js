const express = require("express");
const db = require("./firebase");
const multer = require("multer");
const { google } = require("googleapis");
const { Readable } = require("stream");

const app = express();
app.use(express.json());
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});


// Настройка Google Drive API
const auth = new google.auth.GoogleAuth({
  keyFile: "C:/Users/maxim/Desktop/editor/src/app/editor-440521-google_disk_key.json",
  scopes: ["https://www.googleapis.com/auth/drive.file"],
});
const drive = google.drive({ version: "v3", auth });

// Маршрут для загрузки изображения в Google Drive
const uploadImageToDrive = async (file) => {
  const fileMetadata = {
    name: file.originalname,
    parents: ["13nThg6xRv2BJEFDw8L_r_WUKpzCUVjbb"], // ID папки в Google Drive
  };

  const media = {
    mimeType: file.mimetype,
    body: Readable.from(file.buffer), // Преобразование буфера в поток
  };

  const uploadedFile = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: "id",
  });

  return uploadedFile.data.id;
};


app.post("/news", upload.single("image"), async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    console.log("Received data:", { title, description, tags });

    if (!title || !description || !tags) {
      return res.status(400).send({ error: "Title, description, and tags are required." });
    }

    const tagsArray = Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim());
    const imageFileId = req.file ? await uploadImageToDrive(req.file) : null; 

    const newsRef = db.collection("news").doc();
    await newsRef.set({ 
      title, 
      description, 
      tags: tagsArray, 
      image: imageFileId 
    }); 

    res.status(200).send({ message: "News added successfully", id: newsRef.id });
  } catch (error) {
    console.error(error); 
    res.status(500).send({ error: error.message });
  }
});





// для получения новости по ID
app.get("/news/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newsRef = db.collection("news").doc(id);
    const newsDoc = await newsRef.get();

    if (!newsDoc.exists) {
      return res.status(404).send({ error: "News not found" });
    }

    res.status(200).send({ id: newsDoc.id, ...newsDoc.data() });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// для получения всех новостей
app.get("/news", async (req, res) => {
  try {
    const newsSnapshot = await db.collection("news").get();
    const newsList = newsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(newsList);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// для обновления новости
app.put("/news/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, tags } = req.body;
    const newsRef = db.collection("news").doc(id);
    await newsRef.update({ title, description, tags });
    res.status(200).send({ message: "News updated successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// для удаления новости
app.delete("/news/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newsRef = db.collection("news").doc(id);
    await newsRef.delete();
    res.status(200).send({ message: "News deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});






/*

$form = @{
    title = "Новая новость"
    description = "Описание новости"
    tags = "тег1, тег2, тег3"
    image = Get-Item "C:/Users/maxim/Desktop/editor/src/app/bmstu.jpg"
}

Invoke-WebRequest -Uri http://localhost:5000/news -Method Post -Form $form



(base) PS C:\Users\maxim\Desktop\editor> Invoke-WebRequest -Uri http://localhost:5000/news -Method Post -ContentType "application/json; charset=utf-8" -Body '{
  title = "Новая новость"
  description = "Описание новости"
  tags = "тег1, тег2, тег3"
  image = Get-Item "C:/Users/maxim/Desktop/editor/src/app/bmstu.jpg"
}'
>> }Invoke-WebRequest: 



Invoke-RestMethod -Uri http://localhost:5000/news -Method Post -ContentType "application/json; charset=utf-8" -Body '{
>>     "title": "Новая новость",
>>     "description": "Описание новости",
>>     "tags": ["тег1", "тег2", "тег3"], "image": "C:/Users/maxim/Desktop/editor/src/app/bmstu.jpg"
>> }'

*/