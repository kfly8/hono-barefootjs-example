import { describe, test, expect } from 'bun:test'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { renderToTest } from '@barefootjs/test'

const UserFormSource = readFileSync(resolve(__dirname, 'UserForm.tsx'), 'utf-8')

describe('UserForm', () => {
  const result = renderToTest(UserFormSource, 'UserForm.tsx')

  test('has no unexpected compiler errors', () => {
    // renderToTest does not build the shared ts.Program that classifies
    // @barefootjs/form's Reactive<T>-branded getters, so it emits one
    // informational SHARED_PROGRAM_REQUIRED diagnostic. `bf build` (which
    // does build the shared program) compiles this component with zero
    // errors — so here we assert there are no OTHER errors.
    const unexpected = result.errors.filter(
      (e) => !e.message.includes('Shared ts.Program required'),
    )
    expect(unexpected).toEqual([])
  })

  test('componentName is UserForm', () => {
    expect(result.componentName).toBe('UserForm')
  })

  test('renders as <form>', () => {
    expect(result.root.tag).toBe('form')
  })

  test('wires input/blur/submit handlers', () => {
    const all = result.findAll({})
    const events = all.flatMap(n => n.events)
    expect(events).toContain('input')
    expect(events).toContain('blur')
    expect(events).toContain('submit')
  })

  test('has three text fields', () => {
    expect(result.findAll({ tag: 'input' }).length).toBe(2)
    expect(result.findAll({ tag: 'textarea' }).length).toBe(1)
  })

  // 0.3.0 exposes per-element handler wiring via TestNode#on() and the
  // onInput/onSubmit/etc. getters. Unlike the flat event collection above,
  // this lets us assert each handler lands on the *correct* element. The
  // form fields are wired through @barefootjs/form's property-access handlers
  // (name.handleInput, form.handleSubmit), so setters/via stay empty while the
  // event itself is still registered on the node.
  describe('event wiring', () => {
    test('the <form> wires submit and nothing else', () => {
      expect(result.root.onSubmit).toBeDefined()
      expect(result.root.on('submit')).not.toBeNull()
      expect(result.root.onInput).toBeUndefined()
      expect(result.root.on('blur')).toBeNull()
    })

    test('each text input wires both input and blur', () => {
      const inputs = result.findAll({ tag: 'input' })
      expect(inputs.length).toBe(2)
      for (const input of inputs) {
        expect(input.onInput).toBeDefined()
        expect(input.on('input')).not.toBeNull()
        expect(input.on('blur')).not.toBeNull()
        expect(input.onSubmit).toBeUndefined()
      }
    })

    test('the <textarea> wires both input and blur', () => {
      const textarea = result.find({ tag: 'textarea' })
      expect(textarea).not.toBeNull()
      expect(textarea!.on('input')).not.toBeNull()
      expect(textarea!.on('blur')).not.toBeNull()
    })
  })
})
