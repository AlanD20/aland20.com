export default function parseArrayId(ids) {

  return ids.split(',').map(id => ({
    id: Number(id)
  }));
}
