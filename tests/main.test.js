test('GET /api/integrations/oura/test returns a list of users', async () => {
    const response = await axios.get('http://localhost:3000/api/integrations/oura/test');
    expect(response.status).toBe(200);
    expect(response.data).toHaveLength(5); // Assuming there are 5 users returned
  });
  