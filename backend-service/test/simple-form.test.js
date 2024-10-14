const { postSimpleForm } = require('../src/handlers/simple-form');
const formService = require('../src/services/simple-form');
const { validatePostSimpleForm } = require('../src/validator');

jest.mock('../src/services/simple-form');
jest.mock('../src/validator');

describe('postSimpleForm with validation', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {
                name: 'John Doe',
                identity_number: '1234567890',
                email: 'test@example.com',
                date_of_birth: '1990-01-01',
            },
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should submit form successfully if input is valid and form does not exist', async () => {
        const input = { 
            name: 'John Doe',
            identity_number: '1234567890', 
            email: 'test@example.com', 
            date_of_birth: '1990-01-01' 
        };
        validatePostSimpleForm.mockReturnValue(input);
        formService.findExistForm.mockResolvedValue(null);
        const newForm = { id: 1, ...input };
        formService.createForm.mockResolvedValue(newForm);

        await postSimpleForm(req, res, next);

        expect(validatePostSimpleForm).toHaveBeenCalledWith(req.body);
        expect(formService.findExistForm).toHaveBeenCalledWith(input.email, input.identity_number);
        expect(formService.createForm).toHaveBeenCalledWith(input);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            status: 'success',
            message: 'Form Submitted Successfully',
            form: newForm,
        });
    });

    it('should throw validation error for invalid name', async () => {
        req.body.name = 'abc'; // Invalid, too short

        validatePostSimpleForm.mockImplementation(() => {
            throw new Error('"name" length must be at least 4 characters long');
        });

        await postSimpleForm(req, res, next);

        expect(validatePostSimpleForm).toHaveBeenCalledWith(req.body);
        expect(next).toHaveBeenCalledWith(expect.objectContaining({
            message: '"name" length must be at least 4 characters long',
        }));
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    it('should throw validation error for invalid identity_number', async () => {
        req.body.identity_number = '123'; // Invalid, too short

        validatePostSimpleForm.mockImplementation(() => {
            throw new Error('"identity_number" length must be at least 10 characters long');
        });

        await postSimpleForm(req, res, next);

        expect(validatePostSimpleForm).toHaveBeenCalledWith(req.body);
        expect(next).toHaveBeenCalledWith(expect.objectContaining({
            message: '"identity_number" length must be at least 10 characters long',
        }));
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    it('should throw validation error for invalid email format', async () => {
        req.body.email = 'invalid-email'; // Invalid email

        validatePostSimpleForm.mockImplementation(() => {
            throw new Error('"email" must be a valid email');
        });

        await postSimpleForm(req, res, next);

        expect(validatePostSimpleForm).toHaveBeenCalledWith(req.body);
        expect(next).toHaveBeenCalledWith(expect.objectContaining({
            message: '"email" must be a valid email',
        }));
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    it('should throw validation error for invalid date_of_birth format', async () => {
        req.body.date_of_birth = '01/01/1990'; // Invalid date format

        validatePostSimpleForm.mockImplementation(() => {
            throw new Error('"date_of_birth" with value "01/01/1990" fails to match the required pattern: /^\\d{4}-\\d{2}-\\d{2}$/');
        });

        await postSimpleForm(req, res, next);

        expect(validatePostSimpleForm).toHaveBeenCalledWith(req.body);
        expect(next).toHaveBeenCalledWith(expect.objectContaining({
            message: '"date_of_birth" with value "01/01/1990" fails to match the required pattern: /^\\d{4}-\\d{2}-\\d{2}$/',
        }));
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
});
