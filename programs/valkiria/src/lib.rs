use anchor_lang::prelude::*;

declare_id!("EhAXbmFhRWr3YKAGWw2Q62fLZsSsVWUpRCCF6F4fhetm");

#[program]
pub mod valkiria {
    use super::*;

    // Esta es la función que los jueces verán como "Lógica de Negocio"
    pub fn registrar_evento(ctx: Context<RegistrarEvento>, contenido: String, cat: u8) -> Result<()> {
        let cuenta = &mut ctx.accounts.cuenta_valkiria;
        cuenta.autor = *ctx.accounts.usuario.key;
        cuenta.texto = contenido;
        cuenta.categoria = cat;
        cuenta.timestamp = Clock::get()?.unix_timestamp; // Esto registra la hora exacta en la blockchain
        
        msg!("Evento Valkiria registrado por: {:?}", cuenta.autor);
        Ok(())
    }
}

// --- AQUÍ SE PEGAN LAS ESTRUCTURAS (Lo que me preguntaste) ---

#[derive(Accounts)]
pub struct RegistrarEvento<'info> {
    // Creamos la cuenta en la blockchain. 
    // Space: 8 (disc) + 32 (pubkey) + 200 (texto) + 8 (i64) + 1 (u8)
    #[account(init, payer = usuario, space = 8 + 32 + 200 + 8 + 1)]
    pub cuenta_valkiria: Account<'info, MensajeValkiria>,
    #[account(mut)]
    pub usuario: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct MensajeValkiria {
    pub autor: Pubkey,
    pub texto: String,
    pub timestamp: i64,
    pub categoria: u8,
}
