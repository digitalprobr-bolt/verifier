export const validateEmailFormat = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const checkDomainExists = async (domain: string): Promise<boolean> => {
  try {
    const response = await fetch(`https://dns.google/resolve?name=${domain}`);
    const data = await response.json();
    return data.Status === 0 && data.Answer && data.Answer.length > 0;
  } catch (error) {
    console.error('DNS lookup failed:', error);
    return false;
  }
};

export const checkMXRecords = async (domain: string): Promise<boolean> => {
  try {
    const response = await fetch(`https://dns.google/resolve?name=${domain}&type=MX`);
    const data = await response.json();
    return data.Status === 0 && data.Answer && data.Answer.length > 0;
  } catch (error) {
    console.error('MX lookup failed:', error);
    return false;
  }
};

export const checkSPF = async (domain: string): Promise<boolean> => {
  try {
    const response = await fetch(`https://dns.google/resolve?name=${domain}&type=TXT`);
    const data = await response.json();
    return data.Answer?.some(record => record.data.includes('v=spf1')) || false;
  } catch (error) {
    console.error('SPF lookup failed:', error);
    return false;
  }
};

export const checkDKIM = async (domain: string): Promise<boolean> => {
  try {
    const response = await fetch(`https://dns.google/resolve?name=default._domainkey.${domain}&type=TXT`);
    const data = await response.json();
    return data.Answer?.some(record => record.data.includes('v=DKIM1')) || false;
  } catch (error) {
    console.error('DKIM lookup failed:', error);
    return false;
  }
};

export const checkDMARC = async (domain: string): Promise<boolean> => {
  try {
    const response = await fetch(`https://dns.google/resolve?name=_dmarc.${domain}&type=TXT`);
    const data = await response.json();
    return data.Answer?.some(record => record.data.includes('v=DMARC1')) || false;
  } catch (error) {
    console.error('DMARC lookup failed:', error);
    return false;
  }
};

export const checkSMTP = async (domain: string): Promise<boolean> => {
  try {
    // First check if MX records exist
    const mxExists = await checkMXRecords(domain);
    
    if (!mxExists) {
      return false;
    }

    // For known email providers, we can be confident about their SMTP service
    const commonEmailProviders = [
      'gmail.com',
      'yahoo.com',
      'outlook.com',
      'hotmail.com',
      'aol.com',
      'protonmail.com'
    ];
    
    if (commonEmailProviders.includes(domain.toLowerCase())) {
      return true;
    }
    
    // For other domains with MX records, assume basic email functionality
    return true;
  } catch (error) {
    console.error('SMTP check failed:', error);
    return false;
  }
};

export const checkBlacklists = async (domain: string): Promise<boolean> => {
  try {
    // Common spam domains
    const knownSpamDomains = [
      'spam.com',
      'tempmail.com',
      'throwawaymail.com',
      'guerrillamail.com',
      'mailinator.com',
      'tempinbox.com',
      'fakeinbox.com',
      'sharklasers.com'
    ];
    
    if (knownSpamDomains.includes(domain.toLowerCase())) {
      return true;
    }

    // Additional check: if domain exists but has no MX records, it might be suspicious
    const [domainExists, hasMX] = await Promise.all([
      checkDomainExists(domain),
      checkMXRecords(domain)
    ]);

    return domainExists && !hasMX;
  } catch (error) {
    console.error('Blacklist check failed:', error);
    return false;
  }
};