export async function checkCourseAccess(courseId: string, studentId: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/courses/${courseId}/access?studentId=${studentId}`);
    
    if (!response.ok) {
      return false;
    }
    
    const data = await response.json();
    return data.hasAccess;
  } catch (error) {
    console.error('Error checking course access:', error);
    return false;
  }
}

export async function getStudentPurchases(studentId: string): Promise<any[]> {
  try {
    const response = await fetch(`/api/student/purchases?studentId=${studentId}`);
    
    if (!response.ok) {
      return [];
    }
    
    const data = await response.json();
    return data.purchases || [];
  } catch (error) {
    console.error('Error fetching student purchases:', error);
    return [];
  }
}
