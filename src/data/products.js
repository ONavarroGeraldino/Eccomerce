

const categories = ["Muebles", "Tecnología", "Iluminación", "Accesorios", "Audio"];

const photos = {
  "Muebles": ["1524758631624-e2822e304c36", "1592078615290-033ee584e267", "1586023492125-27b2c045efd7", "1505843490538-5133c6c7d0e1", "1519961655809-34aa550c5227"],
  "Tecnología": ["1511467687858-23d96c32e4ae", "1527443224154-c4a3942d3acf", "1525547718501-df30a628452e", "1618335829737-22287339212a", "1550745165-9bc0b252726f"],
  "Iluminación": ["1534073828943-f801091bb18c", "1507473885765-e6ed057f782c", "1513506003901-1e6a229e2d15", "1538332576228-eb5b4c4de6f5", "1455792244736-3ed96c3d1f79"],
  "Accesorios": ["1585338107529-13afc5f02586", "1586075010633-247fe1bd8e9b", "1509423350716-97f9360b4e09", "1523275335684-37898b6baf30", "1616423641454-da9061036bbb"],
  "Audio": ["1505740420928-5e560c06d30e", "1546435770-a3e426bf472b", "1484704849700-f032a568e944", "1524678606370-a47ad25cb82a", "1458560871784-56d23406c091"]
};

const names = ["Minimal", "Pro", "Elite", "Essential", "Modern"];

// Lista de productos a eliminar 
const toRemove = [
  "Muebles Modern", 
  "Tecnología Elite", 
  "Tecnología Essential", 
  "Iluminación Modern", 
  "Accesorios Pro", 
  "Accesorios Modern"
];

const allProducts = categories.flatMap((category, catIdx) => {
  return Array.from({ length: 5 }).map((_, prodIdx) => {
    const productName = `${category} ${names[prodIdx]}`;
    const id = (catIdx + 1) * 100 + prodIdx; // Generador de ID único

    return {
      id: id,
      name: productName,
      price: Math.floor(Math.random() * (480 - 30) + 30),
      category: category,
      image: `https://images.unsplash.com/photo-${photos[category][prodIdx]}?auto=format&fit=crop&q=80&w=800`,
      stock: Math.floor(Math.random() * 10) + 1 // <--- Stock inicial entre 1 y 10
    };
  });
});

// Exportamos la lista filtrada
export const products = allProducts.filter(product => !toRemove.includes(product.name));