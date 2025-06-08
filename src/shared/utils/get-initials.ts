export const getInitials = (fullName: string): string => {
  if (!fullName) return '';

  const names = fullName.split(' ');
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }

  const initials = names.map(name => name.charAt(0).toUpperCase()).join('');
  return initials;
}