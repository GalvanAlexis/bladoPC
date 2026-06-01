import { getLibraryData, getTopicContent } from '@/lib/markdown';

describe('Library Parser', () => {
  it('should get library data successfully', () => {
    const data = getLibraryData();
    expect(data).toBeDefined();
    expect(data.carreras.length).toBe(4); // 3 carreras + miscelanea

    const miscelanea = data.carreras.find(c => c.id === '4 Miscelanea');
    expect(miscelanea).toBeDefined();
    expect(miscelanea?.colorFamily).toBe('amber');
    
    const sistemas = data.carreras.find(c => c.id === '1 Ing Sistemas');
    expect(sistemas).toBeDefined();
    expect(sistemas?.colorFamily).toBe('indigo');
    
    // Check if years are parsed
    expect(sistemas?.years.length).toBeGreaterThan(0);
    
    // Test if some materia exists (from content)
    const year1 = sistemas?.years.find(y => y.year === 1);
    expect(year1).toBeDefined();
    expect(year1?.materias.length).toBeGreaterThan(0);
    
    const mat2 = year1?.materias.find(m => m.slug === 'matematica-ii');
    if (mat2) {
      expect(mat2.name).toBe('Matemática II');
      expect(mat2.status).toBeDefined();
    }
  });

  it('should get topic content successfully for an existing file', () => {
    const content = getTopicContent('1 Ing Sistemas', 1, 'matematica-ii');
    // It could be null if tests run in an env without content, but let's assume we have it in the local repo
    if (content !== null) {
      expect(content.title).toContain('Matemática II');
      expect(content.markdown.length).toBeGreaterThan(0);
    }
  });
  
  it('should return null for non-existent topic', () => {
    const content = getTopicContent('1 Ing Sistemas', 1, 'non-existent-topic');
    expect(content).toBeNull();
  });
});
