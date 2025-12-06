// Utilitários de validação e sanitização

/**
 * Valida formato de email
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Sanitiza string removendo caracteres perigosos
 */
export function sanitizeString(str: string): string {
    if (!str) return str;
    
    return str
        .trim()
        .replace(/[<>]/g, '') // Remove < e > para evitar XSS
        .slice(0, 500); // Limita tamanho
}

/**
 * Valida e sanitiza email
 */
export function validateAndSanitizeEmail(email: string): string {
    if (!email) {
        throw new Error('Email is required');
    }
    
    const sanitized = email.trim().toLowerCase();
    
    if (!isValidEmail(sanitized)) {
        throw new Error('Invalid email format');
    }
    
    return sanitized;
}

/**
 * Valida senha
 */
export function validatePassword(password: string): void {
    if (!password || password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
    }
    
    if (password.length > 100) {
        throw new Error('Password is too long');
    }
}

/**
 * Valida nome
 */
export function validateName(name: string): string {
    if (!name || name.trim().length === 0) {
        throw new Error('Name is required');
    }
    
    const sanitized = sanitizeString(name);
    
    if (sanitized.length < 2) {
        throw new Error('Name must be at least 2 characters long');
    }
    
    if (sanitized.length > 100) {
        throw new Error('Name is too long');
    }
    
    return sanitized;
}
