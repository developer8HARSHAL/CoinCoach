export async function verifyAgeAccess(userAge, requestedAgeGroup) {
  if (!userAge && userAge !== 0) {
    return { 
      hasAccess: false, 
      reason: 'Age not set',
      suggestedAction: 'Please update your profile with your age'
    };
  }
  
  const userAgeGroup = userAge < 18 ? 'under18' : 'above18';
  
  if (requestedAgeGroup && requestedAgeGroup !== userAgeGroup) {
    return {
      hasAccess: false,
      reason: 'Age restriction',
      suggestedAction: `Access restricted to ${userAgeGroup} courses`
    };
  }
  
  return { hasAccess: true };
}