// Simulated sessions data store
let sessions = [];
let sessionId = 1;

export const scheduleSession = async (sessionData) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const newSession = {
        id: sessionId++,
        ...sessionData,
        status: 'scheduled',
        createdAt: new Date().toISOString(),
      };
      sessions.push(newSession);
      resolve(newSession);
    }, 500);
  });
};

export const getSessionsByUser = async (userId, role) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const userSessions = sessions.filter(session => 
        role === 'coach' ? session.coach.id === userId : session.student.id === userId
      );
      resolve(userSessions);
    }, 500);
  });
};