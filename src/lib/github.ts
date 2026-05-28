export async function getGithubProjectsContext(): Promise<string> {
  try {
    const res = await fetch('https://api.github.com/users/GalvanAlexis/repos?sort=updated&per_page=30', {
      next: { revalidate: 3600 } // Cache por 1 hora
    });
    
    if (!res.ok) {
      console.error('Error fetching GitHub repos:', res.statusText);
      return "El portal a GitHub está bloqueado temporalmente.";
    }
    
    const repos = await res.json() as any[];
    
    // Filtrar repositorios forks para enfocarnos en los propios
    const reposInfo = repos
      .filter(repo => !repo.fork)
      .map(repo => {
        const desc = repo.description ? repo.description : "Sin descripción";
        const lang = repo.language ? repo.language : "Varios";
        const topics = repo.topics && repo.topics.length > 0 ? `Tags: ${repo.topics.join(', ')}` : "";
        return `- **${repo.name}**: ${desc} (Lenguaje principal: ${lang}). ${topics} | Enlace: ${repo.html_url}`;
      });

    return `Repositorios públicos recientes de GalvanAlexis en GitHub:\n` + reposInfo.join('\n');
  } catch (error) {
    console.error('Exception fetching GitHub repos:', error);
    return "No se pudieron obtener los repositorios de GitHub.";
  }
}
