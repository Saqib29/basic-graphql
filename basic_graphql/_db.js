let games = [
  { id: '1', title: "Zelda, Tears of the Kingdom", platform: ["Switch"] },
  { id: '2', title: "Cyberpunk 2077", platform: ["PC", "PlayStation", "Xbox"] },
  {
    id: '3',
    title: "Red Dead Redemption 2",
    platform: ["PC", "PlayStation", "Xbox", "Stadia"],
  },
  { id: '4', title: "The Last of Us Part II", platform: ["PlayStation"] },
  { id: '5', title: "Super Mario Odyssey", platform: ["Switch"] },
  { id: '6', title: "Halo Infinite", platform: ["Xbox", "PC"] },
  { id: '7', title: "Final Fantasy VII Remake", platform: ["PlayStation"] },
  { id: '8', title: "Among Us", platform: ["PC", "Mobile"] },
];

let authors = [
  { id: "1", name: "mario", verified: true },
  { id: "2", name: "luigi", verified: true },
  { id: "3", name: "peach", verified: false },
  { id: "4", name: "yoshi", verified: true },
  { id: "5", name: "link", verified: false },
  { id: "6", name: "samus", verified: true },
  { id: "7", name: "kirby", verified: false },
  { id: "8", name: "sonic", verified: true },
];
  

let reviews = [
  { id: '1', rating: 9, content: 'lorem ipsum', author_id: '1', game_id: '2' },
  { id: '2', rating: 8, content: 'Awesome game!', author_id: '3', game_id: '5' },
  { id: '3', rating: 7, content: 'Decent gameplay but lacks depth.', author_id: '2', game_id: '3' },
  { id: '4', rating: 10, content: 'Absolutely loved it!', author_id: '5', game_id: '1' },
  { id: '5', rating: 6, content: 'Needs improvement.', author_id: '4', game_id: '6' },
  { id: '6', rating: 9, content: 'Fantastic storyline.', author_id: '6', game_id: '7' },
  { id: '7', rating: 5, content: 'Disappointed by the graphics.', author_id: '7', game_id: '8' },
  { id: '8', rating: 8, content: 'Fast-paced and exciting!', author_id: '8', game_id: '4' }
];

export default { games, authors, reviews }